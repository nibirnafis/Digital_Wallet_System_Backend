import { ObjectId } from "mongoose"

export enum WalletStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING = "PENDING",
    BLOCKED = "BLOCKED",
    SUSPENDED = "SUSPENDED",
}

export interface IWallet {
    _id?: ObjectId,
    userId: ObjectId,
    balance: number,
    status: WalletStatus,
}