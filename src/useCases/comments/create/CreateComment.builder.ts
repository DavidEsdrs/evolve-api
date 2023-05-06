import prisma from "../../../utils/prisma"
import { CreateCommentController } from "./CreateComment.controller";
import { CreateCommentService } from "./CreateComment.service"

export const buildCreateComment = () => {
    const service = new CreateCommentService(prisma);
    const controller = new CreateCommentController(service);
    return controller;
}