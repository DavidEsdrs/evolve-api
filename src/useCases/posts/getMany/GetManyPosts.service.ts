import { PrismaClient } from "@prisma/client";
import { IGetManyPostsDTO } from "./GetManyPosts.dto";

export class GetManyPostsService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ limit = 10, offset = 0 }: IGetManyPostsDTO) {
        const posts = await this.prisma.post.findMany({
            take: limit,
            skip: offset
        });
        return posts;
    }
}