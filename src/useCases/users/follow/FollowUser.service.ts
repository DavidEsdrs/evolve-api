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

        await this.prisma.followerMap.create({
            data: {
                followerId: follower_id,
                followingId: following_id
            }
        });
    }
}