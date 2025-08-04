import { ObjectId } from "mongoose";

export enum addMoneyEndPoints {
    BANK_TRASNSFER = "bank-transfer",
}


export enum transactionEndpoints {
    SEND_MONEY = "send-money",
    CASH_IN = "cash-in",
    CASH_OUT = "cash-out"
}


export enum transactionTypes {
    BANK_TRASNSFER = "BANK TRASNSFER",
    SEND_MONEY = "SEND MONEY",
    CASH_IN = "CASH IN",
    CASH_OUT = "CASH OUT",
}


export enum transactionStatus {
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}


export interface ITransaction {
    userId: ObjectId,
    type: string,
    amount: number,
    from?: ObjectId,
    to?: ObjectId,
    status: transactionStatus
}