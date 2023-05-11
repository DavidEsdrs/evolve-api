import { PrismaClient } from "@prisma/client";
import { IGetLikesFromPostDTO } from "./GetLikesFromPost.dto";

export class GetLikesFromPostService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ post_id }: IGetLikesFromPostDTO) {
        const likes = await this.prisma.like.findMany({
            where: {
                postId: post_id
            },
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        unique_username: true
                    }
                },
                createdAt: true,
                updatedAt: true                
            }
        });
        return likes;
    }
}