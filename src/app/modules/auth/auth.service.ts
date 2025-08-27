import { JwtPayload } from "jsonwebtoken"
import AppError from "../../ErrorHelpers/AppError"
import { checkUserStatus } from "../../utils/checkStatus"
import { createTokens } from "../../utils/userTokens"
import { User } from "../user/user.model"
import bcryptjs from "bcryptjs"


const { createUserToken } = createTokens


const userLoginService = async (body: JwtPayload) => {

    const { phone, pin } = body
    
    const isUserExist = await User.findOne({phone: phone}).populate('wallet')

    if(!isUserExist){
        throw new AppError(401, "User Does Not Exist")
    }

    checkUserStatus(isUserExist)

    const comparePin = await bcryptjs.compare(pin as string, isUserExist.pin as string)

    if(!comparePin){
        throw new AppError(401, "Password Does Not Match")
    }

    const tokens = createUserToken(isUserExist)

    return {
        user: isUserExist,
        tokens
    }
}


export const authServices = { userLoginService }