import { Request, Response } from "express";
import { ICreateLikeDTO } from "./CreateLike.dto";

export interface ICreateLikeService {
    execute(args: ICreateLikeDTO): Promise<void>;
}

export class CreateLikeController {
    constructor(
        private service: ICreateLikeService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const { post_id } = req.params;
        await this.service.execute({ post_id: Number(post_id), user_id });
        return res.sendStatus(204);
    }
}