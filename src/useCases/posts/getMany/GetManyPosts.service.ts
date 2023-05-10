import { Post, PrismaClient } from "@prisma/client";
import { IGetManyPostsDTO } from "./GetManyPosts.dto";
import { calcByWeight } from "../../../utils/util";

interface TagUsage { 
    name: string;
    count: number;
};

export class GetManyPostsService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ limit = 10, offset = 0, interactions, user_id }: IGetManyPostsDTO) {
        const userMostInteractions = await this.prisma.interactionHistory.findMany({
            where: { userId: user_id },
            select: {
                post: {
                    select: {
                        id: true,
                        tags: true
                    }
                }
            },
            take: interactions,
            orderBy: {
                createdAt: "desc"
            }
        });

        const mostUsedTags = userMostInteractions.map(ui => ui.post.tags.map(pt => pt.name)).flat();

        const tagsCount = this.getTagsCount(mostUsedTags);

        const postsRel = calcByWeight(tagsCount, limit, Math.floor);

        const posts = await this.getPostsByTags(postsRel);

        return posts;
    }

    private getTagsCount(mostUsedTags: string[]): [string, number][] {
        const tagsCount: [string, number][] = [];

        mostUsedTags.forEach(tag => {
            const tagAlreadyInTagsCount = tagsCount.find(t => t[0] === tag);
            if(tagAlreadyInTagsCount) {
                tagAlreadyInTagsCount[1]++;
            } else {
                tagsCount.push([tag, 1]);
            }
        });

        return tagsCount;
    }

    private async getPostsByTags(tagsUsage: [string, number][], limit?: number) {
        if(!limit) {
            limit = tagsUsage.map(t => t[1]).reduce((p, c) => p + c);
        }

        const postsPromises = tagsUsage.map(tagUsage => {
            return this.prisma.post.findMany({
                where: { 
                    tags: { 
                        some: { 
                            name: tagUsage[0] 
                        }, 
                        none: { 
                            name: {
                                in: tagsUsage.filter(tag => tag[0] !== tagUsage[0]).map(tag => tag[0])
                            }
                        } 
                    } 
                },
                include: {
                    tags: true
                },
                take: tagUsage[1]
            });
        });

        return (await Promise.all([...postsPromises])).flat();
    }
}