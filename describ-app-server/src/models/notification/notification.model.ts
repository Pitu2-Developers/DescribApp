import { Schema, SchemaOptions, model } from 'mongoose'
import { INotificationDocument } from './notification.interface';

const options: SchemaOptions = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    id: false
}

const NotificationSchema: Schema = new Schema({
    /*
        0 -> MESSAGE NOTIFICATION
        1 -> ALERT NOTIFICATION 
    */

    _type: { type: Number, enum: [0, 1] },
    status: { type: Boolean, default: false },
    sender: { type: Schema.Types.ObjectId, ref: 'user' },
    accident: { type: Schema.Types.ObjectId, ref: 'accident' }
}, options)

export default model<INotificationDocument>('notification', NotificationSchema)