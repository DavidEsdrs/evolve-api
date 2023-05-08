import { PrismaClient } from "@prisma/client";
import { IFollowUserDTO } from "./FollowUser.dto";

export class FollowUserService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ follower_id, following_id }: IFollowUserDTO) {
        if(follower_id === following_id) {
            throw new Error("Can't follow yourself!");
        }
        
        const userAlreadyFollowedUser = await this.prisma.followerMap.findFirst({
            where: { AND: [ { followerId: follower_id }, { followingId: following_id } ] }
        });

        if(userAlreadyFollowedUser) {
            throw new Error("Can't follow the same user more than once!");
        }

        const followMapCreationPromise = this.prisma.followerMap.create({
            data: {
                followerId: follower_id,
                followingId: following_id
            }
        });

        const incrementFollowerCount = this.prisma.user.update({
            where: { id: following_id }, 
            data: { followersCount: { increment: 1 } }
        });

        const incrementFollowingCount = this.prisma.user.update({
            where: { id: follower_id },
            data: { followingCount: { increment: 1 } }
        });
        
        await this.prisma.$transaction([
            followMapCreationPromise,
            incrementFollowerCount,
            incrementFollowingCount
        ]);
    }
}