import prisma from "../../../utils/prisma"
import { GetOnePostController } from "./GetOnePost.controller";
import { GetOnePostService } from "./GetOnePost.service"

export const buildGetOnePost = () => {
    const service = new GetOnePostService(prisma);
    const controller = new GetOnePostController(service);
    return controller;
}