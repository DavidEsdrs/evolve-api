import { Request, Response } from "express";
import { IFollowUserDTO } from "./FollowUser.dto";

export interface IFollowUserService {
    execute(args: IFollowUserDTO): Promise<void>;
}

export class FollowUserController {
    constructor(
        private service: IFollowUserService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id: follower_id } = req;
        const { user_id: following_id } = req.params;
        await this.service.execute({ follower_id, following_id: Number(following_id) });
        return res.sendStatus(204);
    }
}