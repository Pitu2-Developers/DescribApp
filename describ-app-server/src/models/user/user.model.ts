import { model, Schema, SchemaOptions } from 'mongoose'
import { compareSync } from 'bcrypt';
import { IUserDocument } from './user.interface';
import { hashPassword } from '../../helpers/client.helpers';
const tooavatar = require('cartoon-avatar')


const options: SchemaOptions = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    id: false,
    discriminatorKey: 'role'
}

const BaseUserSchema: Schema = new Schema({
    avatar: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['M', 'F'], default: 'M' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    notifications: [{ type: Schema.Types.ObjectId, ref: 'notification', default: [] }]
}, options)


BaseUserSchema.virtual('fullname')
    .get(function () {
        return `${this.firstName} ${this.lastName}`
    })


BaseUserSchema.methods.comparePassword = function (password: string) {
    return compareSync(password, this.password)
}

BaseUserSchema.pre('save', function (next: Function) {
    const user = this as IUserDocument

    if (!user.isModified('password')) return next()

    else if (user.isNew || user.isModified('password')) {
        user.password = hashPassword(user.password)
        user.avatar = tooavatar.generate_avatar({ gender: user.gender === 'M' ? 'male' : 'female' })
        next()
    }

})
export default model<IUserDocument>('user', BaseUserSchema)