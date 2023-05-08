import prisma from "../../../utils/prisma"
import { GetUserController } from "./GetUser.controller";
import { GetUserService } from "./GetUser.service"

export const buildGetUser = () => {
    const service = new GetUserService(prisma);
    const controller = new GetUserController(service);
    return controller;
}