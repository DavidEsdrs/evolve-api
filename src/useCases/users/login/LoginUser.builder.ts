import prisma from "../../../utils/prisma"
import { LoginUserController } from "./LoginUser.controller";
import { LoginUserService } from "./LoginUser.service"

export const buildLoginUser = () => {
    const service = new LoginUserService(prisma);
    const controller = new LoginUserController(service);
    return controller;
}