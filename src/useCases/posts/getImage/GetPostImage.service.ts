import { Post, PrismaClient } from "@prisma/client";
import { IGetPostImageDTO } from "./GetPostImage.dto";
import fs, { ReadStream } from "fs";
import path from "path";
import { Readable } from "stream";

export class GetPostImageService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ post_id, start, end }: IGetPostImageDTO) {
        const post = await this.prisma.post.findFirst({
            where: {
                id: post_id
            },
            select: {
                image_path: true
            }
        });
        if(!post) {
            throw new Error("Post not found!");
        }
        const fileType = post.image_path.split(".").pop();
        const readStream: ReadStream = this.createReadStream({
            image_path: post.image_path, 
            fileType, 
            start, 
            end
        });
        return {
            fileType,
            readStream
        };
    }
    
    createReadStream({ fileType, image_path, end, start }: { image_path: string, fileType: string, start?: number, end?: number }) {
        if(fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
            return fs.createReadStream(path.join(__dirname, "..", "..", "..", "..", "uploads", "image", image_path));
        } 
        
        else if (fileType === "mp4") {
            return fs.createReadStream(path.join(__dirname, "..", "..", "..", "..", "uploads", "image", image_path), {
                start,
                end
            });
        }
    }
}