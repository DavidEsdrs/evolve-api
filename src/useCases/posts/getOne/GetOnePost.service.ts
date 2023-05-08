import { PrismaClient } from "@prisma/client";
import { IGetOnePostDTO } from "./GetOnePost.dto";

export class GetOnePostService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ id }: IGetOnePostDTO) {
        const post = await this.prisma.post.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                description: true,
                image_path: true,
                createdAt: true,
                updatedAt: true,
                commentsCount: true,
                likesCount: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        unique_username: true
                    }
                }
            }
        });
        return post;
    }
}