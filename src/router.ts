import { Router } from "express";
import { CreateClient } from "./utils/prisma";
import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const router = Router();
const prisma = CreateClient();

router.get("/", (req, res) => res.json("running"));

router.post("/users", async (req, res) => {
    const { email, password, username, unique_username, bio } = req.body;
    const userAlreadyExist = await prisma.user.findUnique({ where: { email } });
    if(userAlreadyExist) {
        throw new Error("Credentials taken!");
    }
    const pwdHash = await hash(password);
    const user = await prisma.user.create({ 
        data: { 
            email,
            password: pwdHash,
            unique_username,
            username,
            bio
        } 
    });
    return res.json(user);
});

export { router };