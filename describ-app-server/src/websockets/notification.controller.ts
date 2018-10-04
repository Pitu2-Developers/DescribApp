import { OnConnect, OnDisconnect, SocketController, ConnectedSocket, OnMessage, SocketId, MessageBody, SocketIO } from 'socket-controllers'
import { Socket } from 'socket.io';
import { Inject } from 'typescript-ioc'
import { RedisHandler } from '../redis';
import { LOGIN, LOGOUT, ALERT, ALERT_SUCCESS, ALERT_FAILED, MESSAGE, REPLY } from './socket.types'
import { AlertData } from './socket.interface';
import { AccidentHelpers } from '../helpers/accident.helpers';
import { IAccidentModel, IAccidentDocument } from '../models/accident/accident.interface';
import { ClientHelpers } from '../helpers/client.helpers';
import { ConversationHelpers } from '../helpers/conversation.helpers';
import { IConversationDocument, Message } from '../models/conversation/conversation.interface';
import { ID } from '../types';
import { NotificationHelpers } from '../helpers/notification.helpers';
import { INotificationDocument } from '../models/notification/notification.interface';
import { AdjusterHelpers } from '../helpers/adjuster.helpers';


@SocketController()
export class NotificationController {
    @Inject private redisHandler: RedisHandler
    @Inject private accidentHelpers: AccidentHelpers
    @Inject private conversationHelpers: ConversationHelpers
    @Inject private notificationHelpers: NotificationHelpers
    @Inject private adjusterHelpers: AdjusterHelpers

    @OnConnect()
    connection(@ConnectedSocket() socket: Socket) {
        console.log(`Socket ID : ${socket.id}`);
    }

    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: Socket) {
        console.log(`Socket ${socket.id} disconnected`);
    }

    @OnMessage(LOGIN)
    onLogin(@SocketId() socketID: string, @MessageBody() _id: string) {
        this.redisHandler.setSocketID(_id, socketID)
        console.log("SOCCKET LOGIN");

    }

    @OnMessage(LOGOUT)
    onLogout(@MessageBody() _id: string): void {
        this.redisHandler.deleteSocketID(_id)
    }

    @OnMessage(MESSAGE)
    async onChatMessage(@MessageBody() data: any, @SocketIO() io: any) {
        let isConnected: boolean, emitTo: string, message: Message,
            conversationID: string = data.conversation._id


        try {

            console.log("ON MESSAGE!");
            //
            if (data.role === 'client')
                emitTo = data.conversation.adjuster._id
            else
                emitTo = data.conversation.client._id

            //CREATE MESSAGE 
            message = {
                sender: data._id,
                text: data.message,
            }


            //CHECK IF THE USER IS ONLINE 
            isConnected = await this.redisHandler.isConnected(emitTo)
            const isAdded: boolean = await this.conversationHelpers.addMessage(conversationID, data.message)
            console.log(`IS ADDED: ${isAdded} and CONNECTED : ${isConnected}`);


            if (isAdded) {
                if (isConnected) {

                    const socketID: string = await this.redisHandler.getSocketID(emitTo)
                    // data.message.sentBy = false
                    data.message.conversation = conversationID
                    io.to(socketID).emit(REPLY, data.message)
                }
            } else {
                console.log("JIJIJI ROLLBACK");

                // REMOVE MESSAGE ROLLBACK
            }



        } catch (error) {
            console.log(error);

        }
    }


    @OnMessage(ALERT)
    async onAlert(@SocketIO() io: any, @ConnectedSocket() socket: Socket, @MessageBody() { _id, adjuster }: AlertData) {
        const accident: IAccidentDocument = await this.accidentHelpers.createAccident({ client: _id, location: { lat: 65.31245, lg: 23.1332 } }),
            isConnected: boolean = await this.redisHandler.isConnected(adjuster),
            canSendAlert: boolean = await this.accidentHelpers.canSendAlert(_id),
            conversation: IConversationDocument = await this.conversationHelpers.createConversation({ client: _id, adjuster, accident: accident._id })




        console.log(`IS CONNECTED -> ${isConnected} \n CAN I SEND ? -> ${canSendAlert}\n Accident ID: ${accident._id}`);


        if (canSendAlert) {
            try {
                const accidentIsSaved = await this.accidentHelpers.saveAccident(accident),
                    conversationIsSaved = await this.conversationHelpers.saveConversation(conversation),
                    notification: INotificationDocument = await this.notificationHelpers.createNotification({ _type: 0, sender: _id, status: false, accident: accident._id })

                this.adjusterHelpers.addNotification(adjuster, notification)

                if (accidentIsSaved && conversationIsSaved) {
                    socket.emit(ALERT_SUCCESS, { accident })

                    if (isConnected) {
                        const adjusterSocketID: string = await this.redisHandler.getSocketID(adjuster)
                        io.to(adjusterSocketID).emit(ALERT_SUCCESS, { accident, notification })
                    }

                } else {
                    socket.emit(ALERT_FAILED, { message: 'Server error :< ', type: 'negative' })
                }
            } catch (error) {
                socket.emit(ALERT_FAILED, { message: 'Server error :< ', type: 'negative' })

            }
        }
        else
            socket.emit(ALERT_FAILED, { message: `You can't send more alerts.`, type: 'warning' })






    }



}