import prisma from "../../../utils/prisma"
import { GetLikesFromPostController } from "./GetLikesFromPost.controller";
import { GetLikesFromPostService } from "./GetLikesFromPost.service"

export const buildGetLikesFromPost = () => {
    const service = new GetLikesFromPostService(prisma);
    const controller = new GetLikesFromPostController(service);
    return controller;
}