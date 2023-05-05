import { PrismaClient } from "@prisma/client";
import { ILoginUserDTO } from "./LoginUser.dto";
import { verify } from "argon2";
import { sign } from "jsonwebtoken";

export class LoginUserService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ email, password }: ILoginUserDTO) {
        const user = await this.prisma.user.findFirst({ where: { email } });
        if(!user) {
            throw new Error("Invalid credentials!");
        }
        const isCorrectPassword = await verify(user.password, password);
        if(!isCorrectPassword) {
            throw new Error("Invalid credentials!");
        }
        const accessToken = sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
            subject: String(user.id),
            expiresIn: process.env.ACCESS_TOKEN_LIFESPAN
        });
        return accessToken;
    }
}