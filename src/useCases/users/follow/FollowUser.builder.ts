import prisma from "../../../utils/prisma"
import { FollowUserController } from "./FollowUser.controller";
import { FollowUserService } from "./FollowUser.service"

export const buildFollowUser = () => {
    const service = new FollowUserService(prisma);
    const controller = new FollowUserController(service);
    return controller;
}