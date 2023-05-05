import { hash } from "argon2";
import { ICreateUserDTO } from "./CreateUser.dto";
import { PrismaClient } from "@prisma/client";

export class CreateUserService {
    constructor(
        private prisma: PrismaClient
    ) {}

    async execute({ bio, email, password, unique_username, username }: ICreateUserDTO) {
        const userAlreadyExist = await this.prisma.user.findFirst({ 
            where: { OR: [ { email }, { unique_username } ] } 
        });
        if(userAlreadyExist) {
            throw new Error("Credentials taken!");
        }
        const pwdHash = await hash(password);
        const user = await this.prisma.user.create({ 
            data: { 
                email,
                password: pwdHash,
                unique_username,
                username,
                bio
            } 
        });
        return user;
    }
}