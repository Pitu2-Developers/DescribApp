import { Schema, SchemaOptions, model } from 'mongoose'
import { IConversationDocument } from './conversation.interface';

const options: SchemaOptions = {
    timestamps: true,
    id: false
}
const messageOptions: SchemaOptions = {
    _id: false,
    id: false,
    timestamps: true
}
const MessageSchema: Schema = new Schema({
    text: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'user' },
    status: { type: Boolean, default: false }

}, messageOptions)


const ConversationSchema: Schema = new Schema({
    isActive: { type: Boolean, default: true },
    messages: [
        // MessageSchema
        {
            avatar: { type: String, required: true },
            name: String,
            text: [{ type: String, required: true }],
            status: { type: Boolean, default: false },
            stamp: String,
            sentBy: { type: Number, enum: [1, 2], required: true }
        }
    ],
    accident: { type: Schema.Types.ObjectId, ref: 'accident' },
    client: { type: Schema.Types.ObjectId, ref: 'user' },
    adjuster: { type: Schema.Types.ObjectId, ref: 'user' },


}, options)




export default model<IConversationDocument>('conversation', ConversationSchema)