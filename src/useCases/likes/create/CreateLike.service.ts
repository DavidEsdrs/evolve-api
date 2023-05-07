import { PrismaClient } from "@prisma/client";
import { ICreateLikeDTO } from "./CreateLike.dto";

export class CreateLikeService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ post_id, user_id }: ICreateLikeDTO) {
        await this.prisma.like.create({
            data: {
                postId: post_id,
                userId: user_id
            }
        });
    }
}