import { Comment } from "@prisma/client";
import { Request, Response } from "express";
import { ICreateCommentDTO } from "./CreateComment.dto";

export interface ICreateCommentService {
    execute(args: ICreateCommentDTO): Promise<Comment>;
}

export class CreateCommentController {
    constructor(
        private service: ICreateCommentService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const { content } = req.body;
        const { post_id } = req.params;
        const comment = await this.service.execute({ content, user_id, post_id: Number(post_id) });
        return res.status(201).json(comment);
    }
}