import { PrismaClient } from "@prisma/client";
import { ICreateCommentDTO } from "./CreateComment.dto";

export class CreateCommentService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ content, post_id, user_id }: ICreateCommentDTO) {
        const commentCreationPromise = this.prisma.comment.create({
            data: {
                content,
                postId: post_id,
                creatorId: user_id
            }
        });
        const commentsCountIncrementPromise = this.prisma.post.update({
            where: { id: post_id },
            data: { commentsCount: { increment: 1 } }
        });
        const [comment, _] = await this.prisma.$transaction([
            commentCreationPromise,
            commentsCountIncrementPromise
        ]);
        return comment;
    }
}