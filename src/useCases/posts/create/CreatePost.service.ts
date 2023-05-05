import { PrismaClient } from "@prisma/client";
import { ICreatePostDTO } from "./CreatePost.dto";

export class CreatePostService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ file_name, user_id, description }: ICreatePostDTO) {
        const post = await this.prisma.post.create({
            data: {
                description,
                image_path: file_name,
                user: {
                    connect: {
                        id: user_id
                    }
                }
            }
        });
        return post;
    }
}