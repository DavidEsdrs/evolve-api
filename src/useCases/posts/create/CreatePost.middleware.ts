import z from "zod";
import { createValidator } from "../../../utils/validation";
import { createMulterParser } from "../../../utils/parser";

const postSchema = z.object({
    description: z.string().max(5000)
});

const validatePost = createValidator(postSchema);

const validateFile = createMulterParser("uploads", "image", ["png", "jpeg", "jpg"]);

const createPostMiddlewares = [validateFile, validatePost];

export { createPostMiddlewares };