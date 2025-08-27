import { Router } from "express";
import { validateSchema } from "../../middlewares/validateRequest";
import { createAdminSchema, createUserSchema, resetPinSchema, searchUserSchema, updateUserStatusSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { createUser, deleteUser, getMyInfo, getUser, resetUserPin, searchUser, updateUserStatus } from "./user.controler";

export const UserRoutes = Router()


UserRoutes.post('/create-user', validateSchema(createUserSchema), createUser)
UserRoutes.post('/create-admin', checkAuth(Role.SUPERADMIN, Role.ADMIN), validateSchema(createAdminSchema), createUser)
UserRoutes.get('/get-user', checkAuth(Role.SUPERADMIN, Role.ADMIN), getUser)
UserRoutes.post('/search-user', validateSchema(searchUserSchema), checkAuth(Role.SUPERADMIN, Role.ADMIN), searchUser)
UserRoutes.get('/get-info-me', checkAuth(Role.USER, Role.AGENT), getMyInfo)
UserRoutes.patch('/update-status/:id', checkAuth(Role.SUPERADMIN, Role.ADMIN), validateSchema(updateUserStatusSchema), updateUserStatus)
UserRoutes.get('/delete-user/:id', checkAuth(...Object.values(Role)), deleteUser)
UserRoutes.patch('/reset-pin', checkAuth(...Object.values(Role)), validateSchema(resetPinSchema), resetUserPin)