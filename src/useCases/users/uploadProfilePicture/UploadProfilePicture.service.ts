import { Request, Response } from "express";
import { IUploadProfilePictureDTO } from "./UploadProfilePicture.dto";
import { PrismaClient } from "@prisma/client";

export interface IUploadProfilePictureService {
    execute(args: IUploadProfilePictureDTO): Promise<void>;
}

export class UploadProfilePictureService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ picture_file_path, user_id }: IUploadProfilePictureDTO) {
        await this.prisma.user.update({
            where: { id: user_id },
            data: { pictureFilePath: picture_file_path }
        });
    }
}