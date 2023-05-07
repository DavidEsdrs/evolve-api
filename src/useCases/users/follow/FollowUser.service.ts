import { PrismaClient } from "@prisma/client";
import { IFollowUserDTO } from "./FollowUser.dto";

export class FollowUserService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ follower_id, following_id }: IFollowUserDTO) {
        await this.prisma.followerMap.create({
            data: {
                followerId: follower_id,
                followingId: following_id
            }
        });
    }
}