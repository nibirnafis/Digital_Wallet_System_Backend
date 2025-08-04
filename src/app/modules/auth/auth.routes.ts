import { Router } from "express";
import { authControlers } from "./auth.controler";
import { validateSchema } from "../../middlewares/validateRequest";
import { userLoginSchema } from "./auth.validation";


const { loginUser, logoutUser, getNewAccessToken } = authControlers
export const AuthRoutes = Router()


AuthRoutes.post('/login', validateSchema(userLoginSchema), loginUser)
AuthRoutes.post('/refresh-token', getNewAccessToken)
AuthRoutes.post('/logout', logoutUser)