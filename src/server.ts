import { Server } from "http";
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import { app } from "./app";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server : Server

const startServer = async() => {
    try {
        await mongoose.connect(process.env.DB_URL as string)

        console.log("DB connected")

        server = app.listen(process.env.PORT, ()=>{
        console.log(`This server is listening to port ${process.env.PORT}`)
    })
    } catch (error) {
        console.log(error)
    }
}


(async () => {
    await startServer()
    await seedSuperAdmin()
})()










// Errors


// signal from servers
process.on('SIGTERM', ()=>{
    console.log('SIGTERM signal recieved.. Server Shutting Down')

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }

    process.exit(1)
})



process.on('unhandledRejection', ()=>{
    console.log('Unhandled Rejection detected.. Server Shutting Down')

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }

    process.exit(1)
})
// Promise.reject(new Error('I forgot to catch the promise'))



process.on("uncaughtExaption" , ()=>{
    console.log('Uncaught Exaption detected.. Server Shutting Down')

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }

    process.exit(1)
})
// throw new Error('I forgot to handle this local error')
