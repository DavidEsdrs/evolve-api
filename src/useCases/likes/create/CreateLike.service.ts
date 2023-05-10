import { PrismaClient } from "@prisma/client";
import { ICreateLikeDTO } from "./CreateLike.dto";

export class CreateLikeService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ post_id, user_id }: ICreateLikeDTO) {
        console.log(user_id)
        const userAlreadyLikedPost = await this.prisma.like.findFirst({ 
            where: { AND: [ { postId: post_id }, { userId: user_id } ] }
        });

        if(userAlreadyLikedPost) {
            throw new Error("Can't like the same post more than once!");
        }

        const likeInsertPromise = this.prisma.like.create({
            data: {
                postId: post_id,
                userId: user_id
            }
        });

        const likesCountIncrementPromise = this.prisma.post.update({
            where: { id: post_id },
            data: { likesCount: { increment: 1 } }
        });

        const transactionsPromise = this.prisma.$transaction([
            likeInsertPromise,
            likesCountIncrementPromise
        ]);

        // No need to guarantee saving the interaction (by performing it inside the above transaction) as saving interactions is not a key feature of the app
        const interactionsSavingPromise = this.prisma.interactionHistory.create({
            data: {
                type: "LIKE",
                postId: post_id,
                userId: user_id
            }
        });
        await Promise.all([transactionsPromise, interactionsSavingPromise]);
    }
}