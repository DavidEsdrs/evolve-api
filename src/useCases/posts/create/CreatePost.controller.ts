import { Post } from "@prisma/client";
import { Request, Response } from "express";
import { ICreatePostDTO } from "./CreatePost.dto";

export interface ICreatePostService {
    execute(args: ICreatePostDTO): Promise<Post>;
}

export class CreatePostController {
    constructor(
        private service: ICreatePostService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id, file_props: { file_name, file_type } } = req;
        const { description } = req.body;
        const post = await this.service.execute({ user_id, description, file_name });
        return res.json(post);
    }
}