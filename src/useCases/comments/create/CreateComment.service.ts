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
        const savingCommentTransactionPromise = this.prisma.$transaction([
            commentCreationPromise,
            commentsCountIncrementPromise
        ]);
        // No need to guarantee saving the interaction (by performing it inside the above transaction) as saving interactions is not needed for any key feature of the app
        const interactionsSavingPromise = this.prisma.interactionHistory.create({
            data: {
                type: "COMMENT",
                userId: user_id,
                postId: post_id
            }
        });
        const [[comment]] = await Promise.all([savingCommentTransactionPromise, interactionsSavingPromise]);
        return comment;
    }
}