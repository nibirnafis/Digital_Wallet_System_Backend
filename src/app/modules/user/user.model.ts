import { model, Schema } from "mongoose";
import { IUser, Role } from "./user.interface";

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pin: { type: String, min: 6, max: 6, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
},
{
    versionKey: false,
    timestamps: true
})


export const User = model<IUser>("User", UserSchema)

