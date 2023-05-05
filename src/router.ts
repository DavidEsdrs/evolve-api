import { Router } from "express";
import { buildCreateUser } from "./useCases/users/create/CreateUser.builder";
import { buildLoginUser } from "./useCases/users/login/LoginUser.builder";
import { buildCreatePost } from "./useCases/posts/create/CreatePost.builder";
import { createPostMiddlewares } from "./useCases/posts/create/CreatePost.middleware";

const router = Router();

router.get("/", (req, res) => res.json("running"));

router.post("/users", (req, res) => buildCreateUser().handle(req, res));

router.post("/users/login", (req, res) => buildLoginUser().handle(req, res));

router.post("/posts", ...createPostMiddlewares, (req, res) => buildCreatePost().handle(req, res));

export { router };