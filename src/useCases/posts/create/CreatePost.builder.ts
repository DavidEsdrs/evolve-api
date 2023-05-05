import prisma from "../../../utils/prisma"
import { CreatePostController } from "./CreatePost.controller";
import { CreatePostService } from "./CreatePost.service"

export const buildCreatePost = () => {
    const service = new CreatePostService(prisma);
    const controller = new CreatePostController(service);
    return controller;
}