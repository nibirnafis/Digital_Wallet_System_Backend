import { JwtPayload } from "jsonwebtoken";
import { transactionEndpoints } from "../modules/transaction/transaction.interface";
import { Role } from "../modules/user/user.interface";
import AppError from "../ErrorHelpers/AppError";




export const transactionPermission = (transactionType: string, sender: JwtPayload, reciever: JwtPayload ) => {
    if(transactionType === transactionEndpoints.SEND_MONEY){
        if(sender.role !== Role.USER || reciever.role !== Role.USER){
            throw new AppError(401, "Only USER can 'Send Money' to another USER")
        }
    }
    
    if(transactionType === transactionEndpoints.CASH_IN){
        if(sender.role !== Role.AGENT || reciever.role !== Role.USER){
            throw new AppError(401, "Only AGENT can 'Cash In' to a USER")
        }
    }
    
    if(transactionType === transactionEndpoints.CASH_OUT){
        if(sender.role !== Role.USER || reciever.role !== Role.AGENT){
            throw new AppError(401, "Only USER can 'Cash Out' to AGENT")
        }
    }

    return transactionType
}