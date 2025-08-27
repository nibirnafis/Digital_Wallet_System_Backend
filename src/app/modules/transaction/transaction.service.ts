import { JwtPayload } from "jsonwebtoken"
import { User } from "../user/user.model"
import AppError from "../../ErrorHelpers/AppError"
import { checkUserStatus, checkWalletStatus } from "../../utils/checkStatus"
import { verifyToken } from "../../utils/jwt"
import { Wallet } from "../wallet/wallet.model"
import { addMoneyCalculation, transactionCalculation } from "../../utils/balanceCalc"
import { transactionPermission } from "../../utils/transactionPermission"
import { Transaction } from "./transaction.model"



// Transfer Money
export const transferService = async(accessToken: string, transactionEndpoint: string, payload: JwtPayload) => {

    // sender
    const verifiedToken = verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload
    const sender = await User.findById(verifiedToken.userId)

    if(!sender){
        throw new AppError(401, "User Does Not Exist")
    }

    checkUserStatus(sender)

    const senderWallet = await Wallet.findById(sender.wallet)

    if(!senderWallet){
        throw new AppError(401, "Wallet Does Not Exist")
    }

    checkWalletStatus(senderWallet)



    // reciever
    const reciever = await User.findOne({phone: payload.phone})

    if(!reciever){
        throw new AppError(401, "Reciever Does Not Exist")
    }

    checkUserStatus(reciever)

    const recieverWallet = await Wallet.findById(reciever.wallet)

    if(!recieverWallet){
        throw new AppError(401, "Wallet Does Not Exist")
    }

    checkWalletStatus(recieverWallet)


    // Transaction Permission
    transactionPermission(transactionEndpoint, sender, reciever)
    const newTransaction = transactionCalculation(payload, transactionEndpoint, senderWallet, recieverWallet)


    return newTransaction
}









// Add Money
export const addMoneyService = async(accessToken: string, addMoneyEndpoint: string, payload: JwtPayload) => {


    // reciever
    const verifiedToken = verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload
    const reciever = await User.findById({_id: verifiedToken.userId})

    if(!reciever){
        throw new AppError(401, "Reciever Does Not Exist")
    }

    checkUserStatus(reciever)
    
    const recieverWallet = await Wallet.findById(reciever.wallet)

    if(!recieverWallet){
        throw new AppError(401, "Wallet Does Not Exist")
    }

    checkWalletStatus(recieverWallet)

    const newTransaction = addMoneyCalculation(payload, addMoneyEndpoint, recieverWallet)

    return newTransaction
}







// get self transactions
export const getMyTransactionService = async(accessToken: string) => {

    const verifiedToken = verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload
    const isUserExist = await User.findById(verifiedToken.userId)

    if(!isUserExist){
        throw new AppError(401, "User Does Not Exist")
    }

    /* const transactions = await Transaction.aggregate([
        { $match: { userId: isUserExist._id } },
        { $lookup: {
            from: "User",
            localField: "userId",
            foreignField: "_id",
            as: 'userId'
        }},
        { $unwind: '$userId' }
    ]) */
   
    /* const transactions = await Transaction.aggregate([
        { $match: { userId: isUserExist._id } },
        { $group: { _id: "$userId" } },
        { $lookup: {
            from: "User",
            localField: "_id",
            foreignField: "_id",
            as: 'userId'
        }},
        
    ]) */


    const transactions = await Transaction.find({userId: isUserExist._id}).sort({createdAt: -1}).populate(["userId", "from", "to"])

    console.log(transactions)
    return transactions
}