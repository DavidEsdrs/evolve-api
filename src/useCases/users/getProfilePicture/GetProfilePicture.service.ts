import fs from "fs";
import { IGetProfilePictureDTO } from "./GetProfilePicture.dto";
import { PrismaClient } from "@prisma/client";
import path from "path";

export class GetProfilePictureService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ user_id }: IGetProfilePictureDTO) {
        const { pictureFilePath } = await this.prisma.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                pictureFilePath: true
            }
        });

        const readStream = fs.createReadStream(path.resolve(__dirname, "..", "..", "..", "..", "uploads", "profile_picture", pictureFilePath));
        return readStream;
    }
}