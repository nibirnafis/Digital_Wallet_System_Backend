import { Router } from "express";
import { getMyWallet, getWallet, updateWalletStatus } from "./wallet.controler";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateSchema } from "../../middlewares/validateRequest";
import { updateWalletStatusSchema } from "./wallet.validation";


export const walletRoutes = Router()


walletRoutes.get('/get-wallet', checkAuth(Role.SUPERADMIN, Role.ADMIN), getWallet)
walletRoutes.get('/get-wallet/:walletId', checkAuth(Role.SUPERADMIN, Role.ADMIN), getWallet)
walletRoutes.get('/get-wallet-me', checkAuth(Role.USER, Role.AGENT), getMyWallet)
walletRoutes.patch('/update-status/:userId', checkAuth(Role.SUPERADMIN, Role.ADMIN), validateSchema(updateWalletStatusSchema), updateWalletStatus)