import { Request, Response, NextFunction } from "express";
import { Schema } from "zod";

type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export const createValidator = (schema: Schema): ExpressMiddleware  => {
    return async (req, res, next) => {
        try {
            await schema.parse(req.body);
            return next();
        } catch (err) {
            return res.status(422).json({ error: "Invalid body!" });
        }
    }
}