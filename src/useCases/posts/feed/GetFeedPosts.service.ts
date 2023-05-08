import { PrismaClient } from "@prisma/client";
import { IGetFeedPostsDTO } from "./GetFeedPosts.dto";

export class GetFeedPostsService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ offset, take, user_id }: IGetFeedPostsDTO) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                following: {
                    select: {
                        followingId: true
                    }
                }
            }
        });
        const followingsId = user.following.map(user => ({ id: user.followingId }));
        const posts = await this.prisma.post.findMany({
            where: { user: { OR: followingsId } },
            include: { user: { select: { id: true, username: true, unique_username: true } } },
            skip: offset,
            take,
            orderBy: {
                createdAt: "desc"
            }
        });
        return posts;
    }
}