import prisma from "../../../utils/prisma"
import { GetManyPostsController } from "./GetManyPosts.controller";
import { GetManyPostsService } from "./GetManyPosts.service"

export const buildGetManyPosts = () => {
    const service = new GetManyPostsService(prisma);
    const controller = new GetManyPostsController(service);
    return controller;
}