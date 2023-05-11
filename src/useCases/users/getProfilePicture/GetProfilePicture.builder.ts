import prisma from "../../../utils/prisma"
import { GetProfilePictureController } from "./GetProfilePicture.controller";
import { GetProfilePictureService } from "./GetProfilePicture.service"

export const buildGetProfilePicture = () => {
    const service = new GetProfilePictureService(prisma);
    const controller = new GetProfilePictureController(service);
    return controller;
}