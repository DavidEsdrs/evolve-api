import { User } from "@prisma/client";
import { ICreateUserDTO } from "./CreateUser.dto";
import { Request, Response } from "express";

export interface ICreateUserService {
    execute(args: ICreateUserDTO): Promise<User>;
}

export class CreateUserController {
    constructor(
        private service: ICreateUserService
    ) {}

    async handle(req: Request, res: Response) {
        const { email, password, username, unique_username, bio } = req.body;
        const user = await this.service.execute({ email, password, username, unique_username, bio });
        return res.json(user);
    }
}