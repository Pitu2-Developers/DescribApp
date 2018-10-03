import Accident from '../models/accident/accident.model'
import { IAccidentModel, IAccidentDocument } from '../models/accident/accident.interface'


export class AccidentHelpers {

    constructor() { }

    public async updateAccidentServices(_id: string, data: boolean[]) {

        try {
            await Accident.findByIdAndUpdate({ _id }, { $set: { mechanicService: data[0], medicalService: data[1] } }).then(res => res)
        } catch (error) {
            throw error
        }

    }

    public createAccident(data: IAccidentModel): IAccidentDocument {
        return new Accident(data)
    }

    public async saveAccident(accident: IAccidentDocument): Promise<boolean> {
        try {
            await accident.save().then(res => res)
            return true
        } catch (error) {
            return false
        }
    }
    public async canSendAlert(client: string): Promise<boolean> {

        try {
            return await Accident.find({ client, isDone: false }).then((res: IAccidentDocument[]) => !(res.length > 0))
        } catch (error) {
            return false
        }


    }
}