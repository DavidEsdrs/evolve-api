import { Router } from "express";
import { buildCreateUser } from "./useCases/users/create/CreateUser.builder";

const router = Router();

router.get("/", (req, res) => res.json("running"));

router.post("/users", (req, res) => buildCreateUser().handle(req, res));

export { router };