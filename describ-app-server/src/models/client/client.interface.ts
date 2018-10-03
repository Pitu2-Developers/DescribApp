import { IUserModel, IUserDocument } from '../user/user.interface';
import { ID } from '../../types';
import { IAccidentModel, IAccidentDocument } from '../accident/accident.interface';

interface Address {
    state: string,
    municipality: string,
    street: {
        name: string,
        noExt: string,
        noInt: string
    },
    col: string,
    postalCode: number
}

interface Contact {
    mobile: string,
    phone?: string
}

interface Driver {
    firstName: string,
    lastName: string,
    age: number,
    gender: string
}

interface Vehicle {
    vehicleType: number,
    model: string,
    doors: number,
    cylinders: number,
    transmission: number,
    isElectric: boolean,
    isEquipped: boolean,
    hasAir: boolean,
    noSerie: string,
    noEngine: string,
    plate: string
}

export interface IClientModel extends IUserModel {
    rfc: string,
    nationality: number,
    maritalStatus: number,
    address: Address,
    contact: Contact,
    drivers: Driver[],
    vehicle: Vehicle,
    adjuster: ID,
    policy: ID
}

export interface IClientDocument extends IUserDocument, IClientModel {


}