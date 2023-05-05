import { Router } from "express";
import { buildCreateUser } from "./useCases/users/create/CreateUser.builder";
import { buildLoginUser } from "./useCases/users/login/LoginUser.builder";

const router = Router();

router.get("/", (req, res) => res.json("running"));

router.post("/users", (req, res) => buildCreateUser().handle(req, res));

router.post("/users/login", (req, res) => buildLoginUser().handle(req, res));

export { router };