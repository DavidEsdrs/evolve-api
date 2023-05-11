import { Comment } from "@prisma/client";
import { Request, Response } from "express";
import { IGetCommentsFromPostDTO } from "./GetCommentsFromPost.dto";

export interface IGetCommentsFromPostService {
    execute(args: IGetCommentsFromPostDTO): Promise<Comment[]>;
}

export class GetCommentsFromPostController {
    constructor(
        private service: IGetCommentsFromPostService
    ) {}

    async handle(req: Request, res: Response) {
        const id = Number(req.params.post_id);
        const take = req.query.take ? Number(req.query.take) : undefined;
        const comments = await this.service.execute({ post_id: id, take });
        return res.json(comments);
    }
}