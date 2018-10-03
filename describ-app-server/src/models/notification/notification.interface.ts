import { ID } from "../../types";
import { Document } from "mongoose";


export interface INotificationModel {
    _type: number,
    sender: ID,
    status?: boolean,
    accident: ID,
}

export interface INotificationDocument extends Document, INotificationModel {


}