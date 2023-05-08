import { PrismaClient, User } from "@prisma/client";
import { IGetUserDTO } from "./GetUser.controller";

export class GetUserService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ user_id }: IGetUserDTO) {
        const user = await this.prisma.user.findFirst({
            where: { id: user_id },
            select: {
                id: true,
                email: true,
                username: true,
                unique_username: true,
                createdAt: true,
                followersCount: true,
                followingCount: true,
                _count: {
                    select: {
                        posts: true
                    }
                }
            }
        });
        return user as Partial<User>;
    }
}