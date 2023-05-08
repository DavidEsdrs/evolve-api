import { Post } from "@prisma/client";
import { Request, Response } from "express";
import { execute } from "graphql";
import { IGetFeedPostsDTO } from "./GetFeedPosts.dto";

export interface IGetFeedPostsService {
    execute(args: IGetFeedPostsDTO): Promise<Post[]>;
}

export class GetFeedPostsController {
    constructor(
        private service: IGetFeedPostsService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const offset = req.query.offset ? Number(req.query.offset) : 0;
        const take = req.query.take ? Number(req.query.take) : 10;
        const posts = await this.service.execute({
            user_id,
            offset,
            take
        });
        return res.json(posts);
    }
}