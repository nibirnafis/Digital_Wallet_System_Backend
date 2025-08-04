import { Router } from "express";
import { getWallet, updateWalletStatus } from "./wallet.controler";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateSchema } from "../../middlewares/validateRequest";
import { updateStatusSchema } from "./wallet.validation";


export const walletRoutes = Router()


walletRoutes.get('/', checkAuth(Role.SUPERADMIN, Role.ADMIN), getWallet)
walletRoutes.get('/:id', checkAuth(Role.SUPERADMIN, Role.ADMIN), getWallet)
walletRoutes.patch('/update-status/:userId', checkAuth(Role.SUPERADMIN, Role.ADMIN), validateSchema(updateStatusSchema), updateWalletStatus)
