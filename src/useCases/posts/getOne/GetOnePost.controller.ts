import { Post } from "@prisma/client";
import { Request, Response } from "express";
import { IGetOnePostDTO } from "./GetOnePost.dto";

export interface IGetOnePostService {
    execute(args: IGetOnePostDTO): Promise<Post>;
}

export class GetOnePostController {
    constructor(
        private service: IGetOnePostService
    ) {}

    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const post = await this.service.execute({ id: Number(id) });
        return res.json(post);
    }
}