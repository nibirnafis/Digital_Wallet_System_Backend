/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { addMoneyService, getMyTransactionService, transferService } from "./transaction.service"
import AppError from "../../ErrorHelpers/AppError"
import { Transaction } from "./transaction.model"
import { User } from "../user/user.model"




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
        message: "Money Added Successfully",
        data: result
    })
})







//  Get Transactions
export const getTransaction = catchAsync( async(req: Request, res: Response, next: NextFunction) => {
    
    const userId = req.params.userId

    if(userId){

        const isUserExist = await User.findById(userId)
    
        if(!isUserExist){
            throw new AppError(403, "User Does Not Exit")
        }

        const transaction = await Transaction.aggregate([
            { $match: { userId: isUserExist._id } }
        ])

        if(!transaction){
            throw new AppError(401, "User Does Not Have ANY Transaction")
        }
    
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "USER's Transaction Retrived Successfully",
            data: transaction
        })
    }


    const transactions = await Transaction.find().populate("userId")


    if(!transactions){
        throw new AppError(401, "No Transiction Exist")
    }


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Transactions Retrived Successfully",
        data: transactions
    })
})








//  Get Self Transactions
export const getMyTransaction = catchAsync( async(req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.cookies.accessToken
    const transactions = await getMyTransactionService(accessToken)
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Transactions Retrived Successfully",
        data: transactions
    })
})