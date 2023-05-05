import { PrismaClient } from "@prisma/client";

export function CreateClient() {
    return new PrismaClient();
}