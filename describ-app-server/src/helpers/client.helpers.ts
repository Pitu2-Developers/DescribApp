import Client from '../models/client/client.model'
import { genSaltSync, hashSync } from 'bcrypt';
import { SALT_FACTOR } from '../config';
import { IClientDocument, IClientModel } from '../models/client/client.interface';
import { IAccidentDocument } from '../models/accident/accident.interface';

export function hashPassword(password: string): string {
    const salt: string = genSaltSync(SALT_FACTOR)
    return hashSync(password, salt)
}


export class ClientHelpers {
    constructor() { }


    public createUser(data: IClientModel): Promise<IClientDocument> {
        const user: IClientDocument = new Client(data)
        return user.save().then((res: IClientDocument) => res)
    }

    public async addAccident(_id: string, accident: IAccidentDocument): Promise<any> {
        try {
            await Client.findByIdAndUpdate({ _id }, { $push: { accidents: accident } }).then(res => res)

        } catch (error) {
            console.log("ERROR!");

            throw error
        }
    }

    // public async canSendAlert(_id: string): Promise<boolean> {
    //     try {
    //         const count: number = (await Client.findById({ _id })
    //             .select('accidents')
    //             .populate('accidents', 'isDone')
    //             .then((client: IClientDocument) => {
    //                 return client.accidents.map((accident: IAccidentDocument) => !accident.isDone)
    //             })).length


    //         return count >= 1 ? false : true
    //     } catch (error) {
    //         console.log(error);
    //         return false
    //     }

    // }



}



