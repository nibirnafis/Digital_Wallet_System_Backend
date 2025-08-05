import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { walletRoutes } from "../modules/wallet/wallet.routes";
import { transactionRoutes } from "../modules/transaction/transaction.routes";


export const routes = Router()


const allRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/wallet',
        route: walletRoutes
    },
    {
        path: '/transaction',
        route: transactionRoutes
    },
]


allRoutes.forEach(route => {
    routes.use(route.path, route.route)
})
