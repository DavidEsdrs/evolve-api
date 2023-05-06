import { Post } from "@prisma/client";
import { Request, Response, query } from "express";
import { IGetManyPostsDTO } from "./GetManyPosts.dto";

export interface IGetManyPostsService {
    execute(args: IGetManyPostsDTO): Promise<Post[]>;
}

type RequestWithQueryParsed = Request<{}, {}, {}, { limit?: number, offset?: number }>;

export class GetManyPostsController {
    constructor(
        private service: IGetManyPostsService
    ) {}

    async handle(req: RequestWithQueryParsed, res: Response) {
        const { limit, offset } = req.query;
        const posts = await this.service.execute({ limit, offset });
        return res.json(posts);
    }
}