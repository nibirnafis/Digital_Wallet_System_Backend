import z from "zod";



// Login schema
export const userLoginSchema = z.object({
    phone: z
        .string()
        .regex(/^[0-9]+$/, "Only Number are allowed"),
    pin: z
        .string("Pin Should be a Number")
        .length(6, "Enter Your 6 digit pin code")
        .regex(/^[0-9]+$/, "Only Number are allowed")
})