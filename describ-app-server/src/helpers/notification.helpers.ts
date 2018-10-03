import { INotificationModel, INotificationDocument } from "../models/notification/notification.interface";
import Notification from '../models/notification/notification.model'


export class NotificationHelpers {

    constructor() { }

    public async createNotification(data: INotificationModel): Promise<INotificationDocument> {
        try {
            const notification: INotificationDocument = await new Notification(data).save().then((res: INotificationDocument) => res)

            return notification.populate('accident', '-client').populate('sender', 'avatar firstName lastName').execPopulate()

        } catch (error) {
            throw error
        }
    }
}