import AppError from "../ErrorHelpers/AppError"
import { IUser } from "../modules/user/user.interface"
import { IWallet, WalletStatus } from "../modules/wallet/wallet.interface"



export const checkUserStatus = (user: IUser) => {

    if(user.isDeleted){
        throw new AppError(403, `User ${user.phone} Is Deleted`)
    }
    
    if(user.isBlocked){
        throw new AppError(403, `User ${user.phone} Is Blocked`)
    }

    return user
}


export const checkWalletStatus = (wallet: IWallet) => {

    if(wallet.status !== WalletStatus.ACTIVE){
        throw new AppError(403, `User ${wallet.userId} Unable To Transit`)
    }

    return wallet
}