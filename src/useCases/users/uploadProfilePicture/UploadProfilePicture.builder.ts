import prisma from "../../../utils/prisma"
import { UploadProfilePictureController } from "./UploadProfilePicture.controller";
import { UploadProfilePictureService } from "./UploadProfilePicture.service"

export const buildUploadProfilePicture = () => {
    const service = new UploadProfilePictureService(prisma);
    const controller = new UploadProfilePictureController(service);
    return controller;
}