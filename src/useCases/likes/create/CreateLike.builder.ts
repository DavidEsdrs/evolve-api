import prisma from "../../../utils/prisma"
import { CreateLikeController } from "./CreateLike.controller";
import { CreateLikeService } from "./CreateLike.service"

export const buildCreateLike = () => {
    const service = new CreateLikeService(prisma);
    const controller = new CreateLikeController(service);
    return controller;
}