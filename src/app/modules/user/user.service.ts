import { JwtPayload } from "jsonwebtoken"
import AppError from "../../ErrorHelpers/AppError"
import { verifyToken } from "../../utils/jwt"
import { WalletStatus } from "../wallet/wallet.interface"
import { Wallet } from "../wallet/wallet.model"
import { IUser, Role } from "./user.interface"
import { User } from "./user.model"
import bcryptjs from "bcryptjs"
import { checkUserStatus } from "../../utils/checkStatus"




// Create User
export const createUserService = async (user: IUser) => {

    const isUserExist = await User.findOne({phone: user.phone})

    if(isUserExist){
        throw new AppError(403, "This Phone Number is already in use")
    }

    const { pin, ...rest } = user

    const hashedPin = await bcryptjs.hash(pin, Number(process.env.BCRYPT_SALT_ROUND))

    const newUser = await User.create({...rest, pin: hashedPin})
    
    
    if(newUser.role !== Role.ADMIN){
        const walletPayload = {
            userId: newUser._id,
            balance: 0,
            status: newUser.role === Role.AGENT && WalletStatus.PENDING || newUser.role === Role.USER && WalletStatus.ACTIVE
        }
    
        const newWallet = await Wallet.create(walletPayload)
    
        const fullUserInfo = await User.findByIdAndUpdate({_id: newUser._id}, {wallet: newWallet._id}, {new: true})
    
        return fullUserInfo
    }

    return newUser
}




//  Get Self info
export const getMyInfoService = async(accessToken: string) => {

    const verifiedToken = verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload
    const isUserExist = await User.findById({_id: verifiedToken.userId})

    if(!isUserExist){
        throw new AppError(401, "User Does Not Exist")
    }

    const userInfo = await User.findById(isUserExist._id).populate("wallet")

    return userInfo
}



// Change Pin
export const changePin = async(oldPin: string, newPin: string, token: string) => {

    const verifiedToken = verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload

    const user = await User.findById(verifiedToken.userId)

    if(!user){
        throw new AppError(403, "User Does Not Exit")
    }

    if(user.role === Role.USER || Role.USER){
        checkUserStatus(user)
    }

    const isPinMatched = await bcryptjs.compare(oldPin, user.pin as string)

    if(!isPinMatched){
        throw new AppError(403, "Password does not match")
    }

    const pin = await bcryptjs.hash(newPin, Number(process.env.BCRYPT_SALT_ROUND))

    const updatedUser = await User.findByIdAndUpdate(verifiedToken.userId, {pin: pin}, {new: true})

    return updatedUser

}



// Update User Status
export const updateUserStatusService = async(id: string, updatedStatus: boolean, ) => {

    const isUserExist = await User.findById(id)
    
    if(!isUserExist){
        throw new AppError(403, "User Does Not Exist")
    }
    
    if(isUserExist.isDeleted){
        throw new AppError(403, "User is Deleted")
    }

    if(isUserExist.isBlocked === updatedStatus){
        throw new AppError(403, `User's status is Already ${updatedStatus ? "BLOCKED" : "UNBLOCKED"}`)
    }
    
    const updatedUser = await User.findByIdAndUpdate(isUserExist._id, {isBlocked: updatedStatus}, { new: true })

    return updatedUser

}




// Delete User Status
export const deleteUserStatusService = async(id: string) => {

    const isUserExist = await User.findById(id)
    
    if(!isUserExist){
        throw new AppError(403, "User Does Not Exist")
    }
    
    if(isUserExist.isDeleted){
        throw new AppError(403, "User is Alreay Deleted")
    }
    
    const deletedUser = await User.findByIdAndUpdate(isUserExist._id, {isDeleted: true}, { new: true })

    const isWalletExist = await Wallet.findById(isUserExist.wallet)

    if(!isWalletExist){
        throw new AppError(403, "Wallet Does Not Exit")
    }

    const deletedWallet = await Wallet.findByIdAndUpdate(isWalletExist._id, {status: WalletStatus.DELETED}, { new: true })

    return {
        deletedUser,
        deletedWallet
    }

}