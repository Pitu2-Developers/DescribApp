import { model, Schema, SchemaOptions } from 'mongoose'
import { IAccidentDocument } from './accident.interface';
import Conversation from '../conversation/conversation.model'
import { IConversationDocument } from '../conversation/conversation.interface';

const options: SchemaOptions = {
    timestamps: true,
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

const AccidentSchema: Schema = new Schema({
    location: {
        lat: { type: String },
        lg: { type: String }
    },
    isDone: { type: Boolean, default: false },
    /*
        1 -> Anomaly
        2 -> Serious incident
        3 -> Major accident
    */
    type: { type: Number, enum: [1, 2, 3], default: 1 },
    medicalService: { type: Boolean, default: false },
    mechanicService: { type: Boolean, default: false },
    client: { type: Schema.Types.ObjectId, ref: 'user' }

}, options)

// AccidentSchema.pre('save', function (next) {
//     const accident = this as IAccidentDocument

//     next()


// })

export default model<IAccidentDocument>('accident', AccidentSchema)
