import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";


export const setCookie = (res: Response, tokens: JwtPayload) => {
    
    if(tokens.accessToken){
        res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
    }
    

    if(tokens.refreshToken){
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
    }

}