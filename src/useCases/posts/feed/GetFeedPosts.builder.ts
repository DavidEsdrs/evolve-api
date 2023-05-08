import prisma from "../../../utils/prisma"
import { GetFeedPostsController } from "./GetFeedPosts.controller";
import { GetFeedPostsService } from "./GetFeedPosts.service"

export const buildGetFeedPosts = () => {
    const service = new GetFeedPostsService(prisma);
    const controller = new GetFeedPostsController(service);
    return controller;
}