import AppError from "../../ErrorHelpers/AppError"
import { checkUserStatus } from "../../utils/checkStatus"
import { User } from "../user/user.model"
import { Wallet } from "./wallet.model"




export const updateStatusService = async(id: string, updatedStatus: string) => {

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