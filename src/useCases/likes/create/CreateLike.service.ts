import { PrismaClient } from "@prisma/client";
import { ICreateLikeDTO } from "./CreateLike.dto";

export class CreateLikeService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ post_id, user_id }: ICreateLikeDTO) {
        const userAlreadyLikedPost = await this.prisma.like.findFirst({ 
            where: { AND: [ { postId: post_id }, { userId: user_id } ] }
        });

        if(userAlreadyLikedPost) {
            throw new Error("Can't like the same post more than once!");
        }

        await this.prisma.like.create({
            data: {
                postId: post_id,
                userId: user_id
            }
        });
    }
}