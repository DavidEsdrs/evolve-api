import { Comment, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { IGetCommentsFromPostDTO } from "./GetCommentsFromPost.dto";

export interface IGetCommentsFromPostService {
    execute(args: IGetCommentsFromPostDTO): Promise<Comment[]>;
}

export class GetCommentsFromPostService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ post_id, take = 10}: IGetCommentsFromPostDTO) {
        const comments = await this.prisma.comment.findMany({
            where: {
                postId: post_id
            },
            take
        });
        
        return comments;
    }
}