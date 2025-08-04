import { NextFunction, Request, Response } from "express"
import AppError from "../ErrorHelpers/AppError"
import { verifyToken } from "../utils/jwt"
import { User } from "../modules/user/user.model"
import { JwtPayload } from "jsonwebtoken"
import { checkUserStatus } from "../utils/checkStatus"



export const checkAuth = (...authRoles: string[]) => async(req: Request, res: Response, next: NextFunction) => {
    
    try {
        const accessToken = req.cookies.accessToken
        
        if(!accessToken){
            throw new AppError(401, "No token recieved")
        }
        
        const verifiedToken = verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload

        if(!verifiedToken){
            throw new AppError(401, "Token not varified")
        }

        const user = await User.findOne({phone: verifiedToken.phone})

        if(!user){
            throw new AppError(401, "User Does Not Exist")
        }

        checkUserStatus(user)
        
        if(!authRoles.includes(verifiedToken.role)){
            throw new AppError(401, "You are not permitted to view this")
        }

        next()

    } catch (error) {
        console.log(error)
        next(error)
    }
}