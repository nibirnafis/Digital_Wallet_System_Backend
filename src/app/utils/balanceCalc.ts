import { JwtPayload } from "jsonwebtoken";
import AppError from "../ErrorHelpers/AppError";
import { addMoneyEndPoints, ITransaction, transactionStatus } from "../modules/transaction/transaction.interface";
import { IWallet } from "../modules/wallet/wallet.interface";
import { Wallet } from "../modules/wallet/wallet.model";
import { Transaction } from "../modules/transaction/transaction.model";




export const transactionCalculation = async(payload: JwtPayload, endpoint: string, senderWallet: IWallet, recieverWallet: IWallet) => {

    // Service
    const transactionType = endpoint.replace("-", " ").toUpperCase()


    //  Sender
    const senderNewBalance = senderWallet.balance - payload.amount
    if(senderNewBalance < 0){
        throw new AppError(401, "Insuficient Balance")
    }
    const senderUpdatedWallet = await Wallet.findByIdAndUpdate(senderWallet._id, {balance: senderNewBalance}, { new: true })

    const senderTransactionPayload: ITransaction = {
        userId: senderWallet.userId,
        type: transactionType,
        amount: payload.amount,
        from: senderWallet.userId,
        to: recieverWallet.userId,
        status: transactionStatus.COMPLETED
    }

    const senderTransaction = await Transaction.create(senderTransactionPayload)



    // reciever
    const recieverNewBalance = recieverWallet.balance + payload.amount
    await Wallet.findByIdAndUpdate(recieverWallet._id, {balance: recieverNewBalance}, { new: true })

    const recieverTransactionPayload: ITransaction = {
        userId: recieverWallet.userId,
        type: transactionType,
        amount: payload.amount,
        from: senderWallet.userId,
        to: recieverWallet.userId,
        status: transactionStatus.COMPLETED
    }
    

    await Transaction.create(recieverTransactionPayload)

    return {
        senderUpdatedWallet,
        senderTransaction,
    }
}








export const addMoneyCalculation = async(payload: JwtPayload, addMoneyEndpoint: string, recieverWallet: IWallet) => {


    //  Sender
    const endPoints: string[] = Object.values(addMoneyEndPoints)

    if(!endPoints.includes(addMoneyEndpoint)){
        throw new AppError(401, 'This Service Is Not Available')
    }
    
    const addMoneyType = addMoneyEndpoint.replace("-", " ").toUpperCase()

    // reciever
    const recieverNewBalance = recieverWallet.balance + payload.amount
    const recieverUpdatedWallet = await Wallet.findByIdAndUpdate(recieverWallet._id, {balance: recieverNewBalance}, { new: true })

    const recieverTransactionPayload: ITransaction = {
        userId: recieverWallet.userId,
        type: addMoneyType,
        amount: payload.amount,
        status: transactionStatus.COMPLETED
    }
    

    const recieverTransaction = await Transaction.create(recieverTransactionPayload)

    return {
        recieverUpdatedWallet,
        recieverTransaction
    }
}
