/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { addMoneyService, getSelfTransactionService, transferService } from "./transaction.service"
import AppError from "../../ErrorHelpers/AppError"
import { Transaction } from "./transaction.model"




//  Transfer Money
export const transferMoney = catchAsync( async(req: Request, res: Response, next: NextFunction) => {
    
    const accessToken = req.cookies.accessToken
    const transactionEndpoint = req.params.type
    const payload = req.body
    const result = await transferService(accessToken, transactionEndpoint, payload)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Money Transfered Successfully",
        data: result
    })
})



//  Add Money
export const addMoney = catchAsync( async(req: Request, res: Response, next: NextFunction) => {
    
    const accessToken = req.cookies.accessToken
    const addMoneyEndpoint = req.params.type
    const payload = req.body
    const result = await addMoneyService(accessToken, addMoneyEndpoint, payload)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Created Successfully",
        data: result
    })
})





//  Get Transactions
export const getTransaction = catchAsync( async(req: Request, res: Response, next: NextFunction) => {
    
    const id = req.params.id

    if(id){
        const transaction = await Transaction.findById(id).populate('from', 'to')

        if(!transaction){
            throw new AppError(401, "Transaction Does Not Exist")
        }
    
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Transaction Retrived Successfully",
            data: transaction
        })
    }

    const transactions = await Transaction.find().populate('from', 'to')

    if(!transactions){
        throw new AppError(401, "No User Exist")
    }


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Transactions Retrived Successfully",
        data: transactions
    })
})








//  Get Self Transactions
export const getSelfTransaction = catchAsync( async(req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.cookies.accessToken
    const transactions = await getSelfTransactionService(accessToken)
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Transactions Retrived Successfully",
        data: transactions
    })
})