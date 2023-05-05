import { Request, Response } from "express";
import { ILoginUserDTO } from "./LoginUser.dto";

export interface ILoginUserService {
    execute(args: ILoginUserDTO): Promise<string>;
}

export class LoginUserController {
    constructor(
        private service: ILoginUserService
    ) {}

    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        const accessToken = await this.service.execute({ email, password });
        return res.json({ accessToken });
    }
}