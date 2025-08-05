/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { getMyWalletService, updateWalletStatusService } from "./wallet.service"
import { Wallet } from "./wallet.model"
import AppError from "../../ErrorHelpers/AppError"
import { verifyToken } from "../../utils/jwt"
import { User } from "../user/user.model"




// Get Wallet
export const getWallet = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const id = req.params.walletId

    if(id){
        const walletInfo = await Wallet.findById(id).populate("userId")

        if(!walletInfo){
            throw new AppError(401, "User's Wallet Does Not Exist")
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Wallets Retrived Successfully",
            data: walletInfo
        })
    }

    const allWallets = await Wallet.find().populate("userId")

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Wallets Retrived Successfully",
        data: allWallets
    })
})






//  Get Self wallet
export const getMyWallet = catchAsync( async(req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.cookies.accessToken
    const wallets = await getMyWalletService(accessToken)
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Transactions Retrived Successfully",
        data: wallets
    })
})









// Update wallet Status
export const updateWalletStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const id = req.params.userId
    const updatedStatus = req.body.status

    const updatedWallet = await updateWalletStatusService(id, updatedStatus)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Wallet Updated Successfully",
        data: updatedWallet
    })
})
