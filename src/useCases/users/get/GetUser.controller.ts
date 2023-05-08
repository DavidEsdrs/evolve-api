import { User } from "@prisma/client";
import { Request, Response } from "express";

export interface IGetUserDTO {
    user_id: number;
}

export interface IGetUserController {
    execute(args: IGetUserDTO): Promise<Partial<User>>;
}

export class GetUserController {
    constructor(
        private service: IGetUserController
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const user = await this.service.execute({ user_id });
        return res.json(user);
    }
}