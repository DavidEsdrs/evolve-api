import prisma from "../../../utils/prisma"
import { GetCommentsFromPostController } from "./GetCommentsFromPost.controller";
import { GetCommentsFromPostService } from "./GetCommentsFromPost.service"

export const buildGetCommentsFromPost = () => {
    const service = new GetCommentsFromPostService(prisma);
    const controller = new GetCommentsFromPostController(service);
    return controller;
}