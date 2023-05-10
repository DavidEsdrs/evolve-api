import { Request, Response, NextFunction } from "express";
import { Schema } from "zod";

type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export const createValidator = (schema: Schema): ExpressMiddleware  => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            return next();
        } catch (err) {
            return res.status(422).json({ error: "Invalid body!", stack: err });
        }
    }
}

export const createQueryValidator = (schema: Schema): ExpressMiddleware  => {
    return async (req, res, next) => {
        try {
            const query = await schema.parseAsync(req.query);
            req.query = query;
            return next();
        } catch (err) {
            return res.status(422).json({ error: "Invalid query!" });
        }
    }
}