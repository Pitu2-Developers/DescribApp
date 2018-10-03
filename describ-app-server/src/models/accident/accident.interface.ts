import { Document } from 'mongoose'
import { ID } from '../../types';


export interface IAccidentModel {
    location?: {
        lat: number,
        lg: number
    },
    isDone?: boolean,
    type?: number,
    medicalService?: boolean,
    mechanicService?: boolean,
    conversation?: ID,
    client: string
}

export interface IAccidentDocument extends Document, IAccidentModel {


}
