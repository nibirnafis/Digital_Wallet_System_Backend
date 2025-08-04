/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { authServices } from "./auth.service"
import { sendResponse } from "../../utils/sendResponse"
import { setCookie } from "../../utils/setCookie"
import AppError from "../../ErrorHelpers/AppError"
import { createTokens } from "../../utils/userTokens"

const { userLoginService } = authServices
const { getNewToken } = createTokens


const loginUser = catchAsync( async(req: Request, res: Response, next: NextFunction ) => {

    const loginInfo = req.body
    const authInfo = await userLoginService(loginInfo)
    const { user, tokens } = authInfo

    setCookie(res, tokens)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Successfully Logged in",
        data: user
    })
})




const logoutUser = catchAsync( async(req: Request, res: Response, next: NextFunction ) => {


    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Logged Out Successfully",
        data: null
    })
})




const getNewAccessToken = catchAsync( async(req: Request, res: Response, next: NextFunction ) => {

    const oldRefreshToken = req.cookies.refreshToken
    if(!oldRefreshToken){
        throw new AppError(401, "No Refresh Token Found")
    }

    const token = await getNewToken(oldRefreshToken as string)

    setCookie(res, token)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "New Accesstoken retrived successfully",
        data: null,
    })
})



export const authControlers = { loginUser, logoutUser, getNewAccessToken }