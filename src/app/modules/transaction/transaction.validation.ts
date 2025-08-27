import z from "zod";




export const tranferMoneySchema = z.object({
    phone: z
        .string()
        .regex(/^[0-9]+$/, "Only Number are allowed"),
    amount: z
        .number("Amount Can't be a String")
        .min(10, "Amount have to at least 10")
})




export const addMoneySchema = z.object({
    amount: z
        .number("Amount Can't be a String")
        .min(500, "Amount have to be at least 500")
})