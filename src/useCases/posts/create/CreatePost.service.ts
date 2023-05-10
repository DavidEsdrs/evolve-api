import { PrismaClient } from "@prisma/client";
import { ICreatePostDTO } from "./CreatePost.dto";

export class CreatePostService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ file_name, user_id, description, tags }: ICreatePostDTO) {
        const post = await this.prisma.post.create({
            data: {
                description,
                image_path: file_name,
                user: {
                    connect: {
                        id: user_id
                    }
                },
                tags: {
                    create: tags.map(tag => ({ name: tag }))
                }
            },
            select: {
                id: true,
                description: true,
                image_path: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        unique_username: true
                    }
                },
                tags: true,
                createdAt: true,
                updatedAt: true,
                likesCount: true,
                commentsCount: true
            }
        });
        return post;
    }
}