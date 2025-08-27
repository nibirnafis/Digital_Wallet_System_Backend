/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { changePin, createUserService, deleteUserStatusService, getMyInfoService, searchUserService, updateUserStatusService } from "./user.service"
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

    const users = await User.find().populate('wallet')

    console.log(users)

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





// Search User
export const searchUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const phone = req.body.phone

    const userInfo = await searchUserService(phone)


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Retrived Successfully",
        data: userInfo
    })
})







//  Get my info
export const getMyInfo = catchAsync( async(req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.cookies.accessToken
    const myInfo = await getMyInfoService(accessToken)
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "My Info Retrived Successfully",
        data: myInfo
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

    const userId = req.params.id
    const updatedStatus = req.body.isBlocked
    const result = await updateUserStatusService(userId, updatedStatus)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Status Updated Successfully",
        data: result
    })
})





// Delete User
export const deleteUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id
    const result = await deleteUserStatusService(userId)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Deleted Successfully",
        data: null
    })
})