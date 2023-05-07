import prisma from "../../../utils/prisma"
import { GetPostImageController } from "./GetPostImage.controller";
import { GetPostImageService } from "./GetPostImage.service"

export const buildGetPostImage = () => {
    const service = new GetPostImageService(prisma);
    const controller = new GetPostImageController(service);
    return controller;
}