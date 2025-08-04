import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

export const generateToken = (payload: JwtPayload, secret: string, expire: string) => {
    const token = jwt.sign(payload, secret, {expiresIn: expire} as SignOptions)

    return token
}


export const verifyToken = (token: string, secret: string) => {
    const varifiedToken = jwt.verify(token, secret)

    return varifiedToken
}