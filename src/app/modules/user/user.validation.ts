import z from "zod";
import { Role } from "./user.interface";



export const createUserSchema = z.object({
    name: z
        .string("Name Should be a String")
        .regex(/^[A-Za-z ]+$/, "Can't be number"),
    phone: z
        .string()
        .regex(/^[0-9]+$/, "Only Number are allowed"),
    pin: z
        .string("Pin Should be a Number")
        .length(6, "Enter 6 digit pin code")
        .regex(/^[0-9]+$/, "Only Number are allowed"),
    role: z
        .literal([Role.USER, Role.AGENT], "Select Role USER or AGENT")
})



export const createAdminSchema = z.object({
    name: z
        .string("Name Should be a String")
        .regex(/^[A-Za-z ]+$/, "Can't be number"),
    phone: z
        .string()
        .regex(/^[0-9]+$/, "Only Number are allowed"),
    pin: z
        .string("Pin Should be a Number")
        .length(6, "Enter 6 digit pin code")
        .regex(/^[0-9]+$/, "Only Number are allowed"),
    role: z
        .literal(Role.ADMIN, "Select Role ADMIN")
})



export const resetPinSchema = z.object({
    oldPin: z
        .string("Pin Should be a Number")
        .length(6, "Enter 6 digit pin code")
        .regex(/^[0-9]+$/, "Only Number are allowed"),
    newPin: z
        .string("Pin Should be a Number")
        .length(6, "Enter 6 digit pin code")
        .regex(/^[0-9]+$/, "Only Number are allowed")
})



export const updateUserStatusSchema = z.object({
    isBlocked: z
        .boolean("Type True to Block or False to Unblock User")
})
