/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { changePin, createUserService, deleteUserStatusService, updateUserStatusService } from "./user.service"
import { User } from "./user.model"
import AppError from "../../ErrorHelpers/AppError"





// Create User
export const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const user = req.body
    const result = await createUserService(user)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Created Successfully",
        data: result
    })
})






// Get User
export const getUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    if(id){
        const user = await User.findById(id).populate('wallet')

        if(!user){
            throw new AppError(401, "User Does Not Exist")
        }
    
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User Retrived Successfully",
            data: user
        })
    }

    const users = await User.find().populate('wallet')

    if(!users){
        throw new AppError(401, "No User Exist")
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users Retrived Successfully",
        data: users
    })
})




// Reset Pin 
export const resetUserPin = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.accessToken
    const oldPin = req.body.oldPin
    const newPin = req.body.newPin
    
    await changePin(oldPin, newPin, token)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password Reset Successfully",
        data: null
    })
})




// Update User Status
export const updateUserStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const id = req.params.userId
    const updatedStatus = req.body
    const result = await updateUserStatusService(id, updatedStatus)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Created Successfully",
        data: result
    })
})





// Update User Status
export const deleteUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const id = req.params.userId
    const result = await deleteUserStatusService(id)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Created Successfully",
        data: result
    })
})