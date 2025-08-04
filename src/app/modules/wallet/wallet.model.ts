import { model, Schema } from "mongoose";
import { IWallet, WalletStatus } from "./wallet.interface";

const walletSchema = new Schema<IWallet>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, required: true },
    status: { type: String, enum: WalletStatus, required: true }
},{
    versionKey: false,
    timestamps: true
})


export const Wallet = model<IWallet>("Wallet", walletSchema)