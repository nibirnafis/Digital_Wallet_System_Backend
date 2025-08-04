/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { updateStatusService } from "./wallet.service"
import { Wallet } from "./wallet.model"
import AppError from "../../ErrorHelpers/AppError"




// Get Wallet
export const getWallet = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

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







// Update wallet Status
export const updateWalletStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const id = req.params.userId
    const updatedStatus = req.body.status

    const updatedWallet = await updateStatusService(id, updatedStatus)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Wallet Status Updated Successfully",
        data: updatedWallet
    })
})