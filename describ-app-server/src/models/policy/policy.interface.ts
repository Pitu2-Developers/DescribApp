import { Document } from "mongoose";


export interface IPolicyModel {
    folio: string,
    expiration: Date
}

export interface IPolicyDocument extends Document, IPolicyModel {

}