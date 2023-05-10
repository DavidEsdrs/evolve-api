import z from "zod";
import { createValidator } from "../../../utils/validation";
import { createMulterParser } from "../../../utils/parser";
import { NextFunction, Request, Response } from "express";

const postSchema = z.object({
    description: z.string().max(5000),
    tags: z.array(z.string()).nonempty()
});

const validatePost = createValidator(postSchema);

const validateFile = createMulterParser("uploads", "image", ["png", "jpeg", "jpg"]);

const createPostMiddlewares = [validateFile, validatePost];

export { createPostMiddlewares };