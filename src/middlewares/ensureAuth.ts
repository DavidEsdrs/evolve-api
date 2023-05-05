import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if(!auth) {
        throw new Error("Authorization header wasn't find!");
    }
    const [, accessToken] = auth.split(' ');
    if(!accessToken) {
        throw new Error("JWT not found in authorization header!");
    }
    verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: false }, (err, decoded) => {
        if(err) {
            throw new Error("Invalid jwt due to " + err?.message);
        }
        req.user_id = Number(decoded.sub);
        return next();
    });
}