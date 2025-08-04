import { ObjectId } from "mongoose";

export enum Role {
    SUPERADMIN = "SUPERADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    AGENT = "AGENT",
    BANK = "BANK"
}



export interface IUser {
    _id?: ObjectId,
    name: string,
    phone: string,
    pin: string,
    role: Role,
    wallet?: ObjectId,
    isBlocked: boolean,
    isDeleted: boolean
}
