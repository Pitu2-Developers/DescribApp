import { IConversationModel, IConversationDocument, Message } from "../models/conversation/conversation.interface";
import Conversation from '../models/conversation/conversation.model'
import { ID } from "../types";

export class ConversationHelpers {

    constructor() { }

    public createConversation(data: IConversationModel): IConversationDocument {
        return new Conversation(data)
    }

    public async saveConversation(conversation: IConversationDocument): Promise<boolean> {
        try {
            await conversation.save().then()
            return true
        } catch (error) {
            return false
        }
    }

    public async getConversationsById(_id: ID, role: string): Promise<IConversationDocument[]> {
        let condition: any = { $and: [{ $or: [{ client: _id }, { adjuster: _id }] }, { isActive: true }] }, populateField: string = 'adjuster'

        try {

            return Conversation.find(condition)
                .populate('client', 'avatar firstName lastName')
                .populate('adjuster', 'avatar firstName lastName')
                .populate('accident')
                .then((res: IConversationDocument[]) => res)


        } catch (error) {
            throw error
        }


    }

    public async addMessage(_id: ID, message: Message) {

        try {

            await Conversation.findByIdAndUpdate({ _id }, { $push: { messages: message } }).then()
            return true
        } catch (error) {
            throw error
        }


    }

    public async getMessageCount(_id: ID) {

        try {
            const count = await Conversation.aggregate([
                { $match: { $and: [{ client: _id }, { isActive: true }] } },
                {
                    $project: {
                        count: { $size: "$messages" }
                    }
                }
            ])
            console.log("COUNT");

            console.log(count);


        } catch (error) {
            console.error(error);

        }


    }
}