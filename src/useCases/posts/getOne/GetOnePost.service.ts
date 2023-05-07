import { PrismaClient } from "@prisma/client";
import { IGetOnePostDTO } from "./GetOnePost.dto";

export class GetOnePostService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ id }: IGetOnePostDTO) {
        const post = await this.prisma.post.findFirst({
            where: {
                id
            },
            include: {
                comments: {
                    select: {
                        id: true,
                        content: true
                    }
                },
                likes: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                },
                _count: true
            }
        });
        return post;
    }
}