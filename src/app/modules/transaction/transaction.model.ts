import { model, Schema } from "mongoose";
import { ITransaction, transactionStatus } from "./transaction.interface";


const transactionSchema = new Schema<ITransaction>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    from: { type: Schema.Types.ObjectId, ref: "User" },
    to: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: transactionStatus, default: transactionStatus.COMPLETED, required: true }
},{
    versionKey: false,
    timestamps: true
})


export const Transaction = model<ITransaction>("Transaction", transactionSchema)