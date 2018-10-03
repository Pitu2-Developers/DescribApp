// import BaseUser from '../base/base.model'
// import BaseUser from '../user/user.model'
import BaseUser from '../user/user.model'
import { Schema } from 'mongoose'
import { IClientDocument } from './client.interface';

console.log(BaseUser.discriminator);

const options = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    id: false,
}



const vehicleSchema = new Schema({
    /* 
        Vehicle types
        1-> CAR 
        2-> TRUCK
    */
    vehicleType: { type: Number, enum: [1, 2], default: 1 },
    model: { type: String, required: true },

    doors: { type: Number, enum: [2, 4], default: 4 },

    cylinders: { type: Number, required: true },
    /* 
        Transmissions
        1 -> Standard
        2 -> Automatic
    */
    transmission: { type: Number, enum: [1, 2], default: 1 },
    isElectric: { type: Boolean, default: false, required: true },
    isEquipped: { type: Boolean, required: true, default: false },
    hasAir: { type: Boolean, default: false },
    noSerie: { type: String, required: true },
    noEngine: { type: String, required: true },
    plate: { type: String, required: true },


}, { _id: false, id: false });

const driverSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['M', 'F'] },

}, { _id: false, id: false });


const UserSchema: Schema = new Schema({
    rfc: { type: String, required: true },

    /* 
       1 - > Mexicana
       2 -> Extranjera 
    */
    nationality: { type: Number, enum: [1, 2], default: 1 },
    /*
        1 -> Soltero 
        2 -> Divorciado
        3 -> Viudo
        4 -> Casado
        5 -> Union Libre
    */
    maritalStatus: { type: Number, enum: [1, 2, 3, 4, 5], default: 1 },

    address: {
        state: { type: String, required: true },
        municipality: { type: String, required: true },
        street: {
            name: { type: String, required: true },
            noExt: { type: Number },
            noInt: { type: String }
        },
        col: { type: String, required: true },
        postalCode: { type: Number, required: true }
    },
    contact: {
        mobile: { type: String, required: true },
        phone: String
    },
    drivers: [
        driverSchema,
    ],
    policy: { type: Schema.Types.ObjectId, ref: "policy" },
    vehicle: vehicleSchema,
    adjuster: { type: Schema.Types.ObjectId, ref: 'adjuster', required: true },
    // accidents: [{ type: Schema.Types.ObjectId, ref: 'accident' }]

}, options)


export default BaseUser.discriminator<IClientDocument>('client', UserSchema)