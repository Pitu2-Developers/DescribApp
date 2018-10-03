import { Types } from 'mongoose'
import { IClientDocument } from '../models/client/client.interface';
// import { IAdjusterDocument } from '../models/adjuster/adjuster.interface';
import { IUserDocument } from '../models/user/user.interface'

export type ID = Types.ObjectId | string

export type Credentials = {
    email: string,
    password: string
}

// export type User = IUserDocument | IAdjusterDocument
export interface AuthResponse {
    user: IUserDocument,
    token: string
}


