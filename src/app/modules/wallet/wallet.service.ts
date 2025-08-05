import { JwtPayload } from "jsonwebtoken"
import AppError from "../../ErrorHelpers/AppError"
import { checkUserStatus } from "../../utils/checkStatus"
import { verifyToken } from "../../utils/jwt"
import { User } from "../user/user.model"
import { Wallet } from "./wallet.model"




export const updateWalletStatusService = async(id: string, updatedStatus: string) => {

    const isUserExist = await User.findById(id)
    
    if(!isUserExist){
        throw new AppError(403, "User Does Not Exit")
    }

    const checkedUser = checkUserStatus(isUserExist)

    const isWalletExist = await Wallet.findById(checkedUser.wallet)

    if(!isWalletExist){
        throw new AppError(403, "Wallet Does Not Exit")
    }

    if(isWalletExist.status === updatedStatus){
        throw new AppError(403, `User's Wallet is Already ${updatedStatus}`)
    }

    const updatedWallet = await Wallet.findByIdAndUpdate(isWalletExist._id, {status: updatedStatus}, { new: true })

    
    return updatedWallet
}








// get self wallet
export const getMyWalletService = async(accessToken: string) => {

    const verifiedToken = verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload
    const isUserExist = await User.findById({_id: verifiedToken.userId})

    if(!isUserExist){
        throw new AppError(401, "User Does Not Exist")
    }

    const wallets = await Wallet.aggregate([
        { $match: { userId: isUserExist._id } },
    ])


    return wallets
}