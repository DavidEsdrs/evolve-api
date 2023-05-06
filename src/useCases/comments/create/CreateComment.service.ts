import { PrismaClient } from "@prisma/client";
import { ICreateCommentDTO } from "./CreateComment.dto";

export class CreateCommentService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ content, post_id, user_id }: ICreateCommentDTO) {
        const comment = await this.prisma.comment.create({
            data: {
                content,
                postId: post_id,
                creatorId: user_id
            }
        });
        return comment;
    }
}