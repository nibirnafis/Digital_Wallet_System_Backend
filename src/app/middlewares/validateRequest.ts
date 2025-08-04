import { NextFunction, Request, Response } from "express"
import { ZodObject, ZodRawShape } from 'zod';

type AnyZodObject = ZodObject<ZodRawShape>


export const validateSchema = (zodSchema: AnyZodObject) => async(req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await zodSchema.parseAsync(req.body)
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}