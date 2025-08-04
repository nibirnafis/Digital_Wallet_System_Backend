import express, { Application } from "express";
import cors from "cors"
import { routes } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";

export const app: Application = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api/v1', routes)


app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.use(globalErrorHandler)