import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const paramsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = z.object({
        id: z.
            string().
            transform((val, ctx) => {
                const parsed = Number(val);
                if(isNaN(parsed)) {
                    ctx.addIssue({
                        code: "invalid_type",
                        message: "id params must to be a valid number!",
                        expected: "number",
                        received: "nan"
                    });
                    return z.NEVER;
                }
                return parsed;
            }).
            refine(val => val > 0)
    });

    const { id } = schema.parse(req.params);
    return next();
}

const getOnePostMiddlewares = [paramsMiddleware];

export { getOnePostMiddlewares };