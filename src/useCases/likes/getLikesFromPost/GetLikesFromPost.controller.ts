import { Like } from "@prisma/client";
import { IGetLikesFromPostDTO } from "./GetLikesFromPost.dto";
import { Request, Response } from "express";

interface IGetLikesFromPostService {
    execute(args: IGetLikesFromPostDTO): Promise<Like[]>;
}

export class GetLikesFromPostController {
    constructor(
        private service: IGetLikesFromPostService
    ) {}

    async handle(req: Request, res: Response) {
        const post_id = Number(req.params.post_id);
        const likes = await this.service.execute({ post_id });
        return res.json(likes);
    }
}