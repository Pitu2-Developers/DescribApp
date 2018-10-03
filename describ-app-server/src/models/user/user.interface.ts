import { Document } from 'mongoose'
import { ID } from '../../types';
import { INotificationDocument } from '../notification/notification.interface';



export interface IUserModel {
    avatar?: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    gender: string,
    isActive?: boolean,
    notifications?: ID[]
}

export interface IUserDocument extends Document, IUserModel {
    comparePassword: (password: string) => boolean
    fullname?: string,
    role: string
}