import prisma from "../../../prisma"
import { CreateUserController } from "./CreateUser.controller";
import { CreateUserService } from "./CreateUser.service"

export const buildCreateUser = () => {
    const service = new CreateUserService(prisma);
    const controller = new CreateUserController(service);
    return controller;
}