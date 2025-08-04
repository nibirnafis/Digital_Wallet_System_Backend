import { JwtPayload } from "jsonwebtoken"
import AppError from "../ErrorHelpers/AppError"
import { IUser } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"
import { generateToken, verifyToken } from "./jwt"




const createUserToken = ( user: Partial<IUser> ) => {

    const payload = {
        userId: user._id,
        phone: user.phone,
        role: user.role
    }

    const accessToken = generateToken(payload, process.env.JWT_ACCESS_TOKEN_SECRET as string, process.env.JWT_ACCESS_TOKEN_EXPIRE as string)
    const refreshToken = generateToken(payload, process.env.JWT_REFRESH_TOKEN_SECRET as string, process.env.JWT_REFRESH_TOKEN_EXPIRE as string)

    return { accessToken, refreshToken }
}




const getNewToken = async(oldRefreshToken: string) => {
    
    const varifiedRefreshToken = verifyToken(oldRefreshToken, process.env.JWT_REFRESH_TOKEN_SECRET as string) as JwtPayload

    if(!varifiedRefreshToken){
        throw new AppError(401, 'Refresh Token not varified')
    }

    const user = await User.findOne({phone: varifiedRefreshToken.phone})

    if(!user){
        throw new AppError(404, "User does not exist")
    }

    if(user?.isBlocked){
        throw new AppError(404, "User is Blocked")
    }

    const JwtPayload = {
        userId: user._id,
        phone: user.phone,
        role: user.role
    }


    const accessToken = generateToken(JwtPayload, process.env.JWT_ACCESS_TOKEN_SECRET as string, process.env.JWT_ACCESS_TOKEN_EXPIRE as string)

    return { accessToken }
}


export const createTokens = { createUserToken, getNewToken }