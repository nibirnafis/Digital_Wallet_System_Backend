import { Router } from "express";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { addMoney, getSelfTransaction, getTransaction, transferMoney } from "./transaction.controler";
import { validateSchema } from "../../middlewares/validateRequest";
import { addMoneySchema, tranferMoneySchema } from "./transaction.validation";

export const transactionRoutes = Router()



// endpoints for type are ----> /send-money, /cash-in, /cash-out
transactionRoutes.post('/:type', checkAuth(Role.USER, Role.AGENT), validateSchema(tranferMoneySchema), transferMoney)


// endpoints for types are ----> /bank-transfer
transactionRoutes.post('/add-money/:type', checkAuth(Role.USER, Role.AGENT), validateSchema(addMoneySchema), addMoney)



transactionRoutes.get('/get-transaction', checkAuth(Role.SUPERADMIN, Role.ADMIN), getTransaction)
transactionRoutes.get('/get-transaction/:id', checkAuth(Role.SUPERADMIN, Role.ADMIN), getTransaction)
transactionRoutes.get('/get-transaction-me', checkAuth(Role.USER, Role.AGENT), getSelfTransaction)