import { Document } from "mongoose";
import { ID } from "../../types";


export interface Message {
    text: string,
    status?: boolean,
    sender: ID,

}

export interface IConversationModel {
    messages?: Message[],
    accident: ID,
    client: ID,
    adjuster: ID
}

export interface IConversationDocument extends Document, IConversationModel {



}
