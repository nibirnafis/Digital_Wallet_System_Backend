import z from "zod";
import { WalletStatus } from "./wallet.interface";



export const updateStatusSchema = z.object({
    status: z
        .enum(Object.values(WalletStatus), "Type Wallet Status 'ACTIVE' or 'INACTIVE' or 'PENDING' or 'BLOCKED' or 'SUSPENDED'")
})