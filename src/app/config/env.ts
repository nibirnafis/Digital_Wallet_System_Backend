/* import dotenv from "dotenv"
dotenv.config()

interface EnvConfig {
    PORT: string,
    DB_URL: string
}

const loadEnvVariables = (): EnvConfig => {

    const requiredEndVariables: string[] = [
        "PORT", "DB_URL"
    ]

    requiredEndVariables.forEach(key=>{
        if(!process.env[key]){
            throw new Error(`Missing require environment ${key}`)
        }
    })


    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.URL as string
    }
}

export const envVars = loadEnvVariables()
 */