import { Post } from "@prisma/client";
import { Request, Response, query } from "express";
import { IGetManyPostsDTO } from "./GetManyPosts.dto";

export interface IGetManyPostsService {
    execute(args: IGetManyPostsDTO): Promise<Post[]>;
}

type RequestWithQueryParsed = Request<{}, {}, {}, { limit?: number, offset?: number, interactions?: number }>;

export class GetManyPostsController {
    constructor(
        private service: IGetManyPostsService
    ) {}

    async handle(req: RequestWithQueryParsed, res: Response) {
        const { user_id } = req;
        const { limit, offset, interactions } = req.query;
        const posts = await this.service.execute({ limit, offset, user_id, interactions });
        return res.json(posts);
    }
}