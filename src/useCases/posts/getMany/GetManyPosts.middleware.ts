import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { createQueryValidator } from "../../../utils/validation";

const querySchema = z.object({
    limit: z.
        string().
        transform((val, ctx) => {
            const parsed = Number(val);
            if(isNaN(parsed)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.invalid_type,
                    message: "Limit must to be a number",
                    expected: "number",
                    received: "nan"
                });

                return z.NEVER;
            }
            return parsed;
        }).
        refine(val => val > 0 && val < 100).
        optional(),

    offset: z.
        string().
        transform((val, ctx) => {
            const parsed = Number(val);
            if(isNaN(parsed)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.invalid_type,
                    message: "Offset must to be a number",
                    expected: "number",
                    received: "nan"
                });
                
                return z.NEVER;
            }
            return parsed;
        }).
        refine(val => val > 0).
        optional(),

    interactions: z.
        string().
        transform((val, ctx) => {
            const parsed = Number(val);
            if(isNaN(parsed)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.invalid_type,
                    message: "Interactions must to be a number",
                    expected: "number",
                    received: "nan"
                });
                
                return z.NEVER;
            }
            return parsed;
        }).
        refine(val => val > 0).
        optional()
});

const queryValidator = createQueryValidator(querySchema);

const getManyPostsMiddlewares = [queryValidator];
export { getManyPostsMiddlewares };