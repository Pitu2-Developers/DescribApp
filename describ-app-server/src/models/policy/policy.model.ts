import { model, Schema, SchemaOptions } from 'mongoose'
import { IPolicyDocument } from './policy.interface';


const options: SchemaOptions = {
    timestamps: true,
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

const PolicySchema: Schema = new Schema({
    folio: { type: String, required: true },
    expiration: { type: Date, required: true },
}, options)

export default model<IPolicyDocument>('policy', PolicySchema)
