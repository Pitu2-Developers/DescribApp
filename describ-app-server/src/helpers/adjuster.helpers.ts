import { IAdjusterModel, IAdjusterDocument } from "../models/adjuster/adjuster.interface";
import Adjuster from '../models/adjuster/adjuster.model'
import { INotificationDocument } from "../models/notification/notification.interface";

export class AdjusterHelpers {

    constructor() { }

    public createAdjuster(data: IAdjusterModel) {
        const adjuster: IAdjusterDocument = new Adjuster(data)

        return adjuster.save().then()
    }

    public async addNotification(_id: string, notification: INotificationDocument) {

        try {
            await Adjuster.findByIdAndUpdate({ _id }, { $push: { notifications: notification } })
        } catch (error) {
            console.error(error);
            throw error;

        }

    }


}