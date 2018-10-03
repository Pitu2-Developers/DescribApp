import { Credentials, AuthResponse, ID } from "../types";
import User from '../models/user/user.model'
import { IUserDocument } from '../models/user/user.interface'
import { Inject } from "typescript-ioc";
import { SecurityService } from "../security";
import { IAdjusterDocument } from "../models/adjuster/adjuster.interface";
import { IClientDocument, IClientModel } from "../models/client/client.interface";
import { IAccidentDocument } from "../models/accident/accident.interface";
import { ConversationHelpers } from "./conversation.helpers";
import { INotificationDocument } from "../models/notification/notification.interface";

export class UserHelpers {
    @Inject private securityService: SecurityService
    @Inject private conversationHelper: ConversationHelpers

    constructor() { }


    public async authenticate({ email, password }: Credentials): Promise<AuthResponse> {


        try {
            const user: IUserDocument = await User.findOne({ email })
                .populate('adjuster')
                .populate({
                    path: 'notifications',
                    match: { status: false },
                    populate: {
                        path: 'sender',
                        select: 'avatar firstName lastName'
                    }
                })
                .then((user: IUserDocument) => user)





            if (!user) throw { message: `${email} doesn't exist`, status: 401 }

            else if (!user.comparePassword(password)) throw { message: 'The password is incorrect', status: 401 }

            else {

                if (user.role == 'client') {/*Nothing*/ }
                user.set('password', undefined, { strict: false })

                return { user, token: this.securityService.generateToken(user._id, user.role) }
            }
        } catch (error) {
            console.error(error);
            throw error
        }


    }
}


