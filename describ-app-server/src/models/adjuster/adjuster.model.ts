import User from '../user/user.model'
import { Schema } from 'mongoose';
import { IAdjusterDocument } from './adjuster.interface';

// console.log(User);
const options = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    id: false,
}

const AdjusterSchema: Schema = new Schema({
    contact: {
        mobile: { type: String, required: true }
    }
}, options)

export default User.discriminator<IAdjusterDocument>('adjuster', AdjusterSchema)