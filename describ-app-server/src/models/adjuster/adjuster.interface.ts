import { IUserDocument, IUserModel } from '../user/user.interface'


export interface IAdjusterModel extends IUserModel {
    contact: {
        mobile: string
    }
}
export interface IAdjusterDocument extends IAdjusterModel, IUserDocument { }
