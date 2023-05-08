import { Router } from "express";
import { buildCreateUser } from "./useCases/users/create/CreateUser.builder";
import { buildLoginUser } from "./useCases/users/login/LoginUser.builder";
import { buildCreatePost } from "./useCases/posts/create/CreatePost.builder";
import { createPostMiddlewares } from "./useCases/posts/create/CreatePost.middleware";
import { ensureAuth } from "./middlewares/ensureAuth";
import { buildGetManyPosts } from "./useCases/posts/getMany/GetManyPosts.builder";
import { getManyPostsMiddlewares } from "./useCases/posts/getMany/GetManyPosts.middleware";
import { buildGetOnePost } from "./useCases/posts/getOne/GetOnePost.builder";
import { getOnePostMiddlewares } from "./useCases/posts/getOne/GetOnePost.middleware";
import { buildCreateComment } from "./useCases/comments/create/CreateComment.builder";
import { buildCreateLike } from "./useCases/likes/create/CreateLike.builder";
import { buildFollowUser } from "./useCases/users/follow/FollowUser.builder";
import { buildGetPostImage } from "./useCases/posts/getImage/GetPostImage.builder";
import { buildGetUser } from "./useCases/users/get/GetUser.builder";

const router = Router();

router.get("/", (req, res) => res.json("running"));

router.post("/users", (req, res) => buildCreateUser().handle(req, res));

router.post("/users/login", (req, res) => buildLoginUser().handle(req, res));

router.use(ensureAuth);

router.get("/users", ensureAuth, (req, res) => buildGetUser().handle(req, res));

router.post("/posts", ...createPostMiddlewares, (req, res) => buildCreatePost().handle(req, res));

router.get("/posts", ...getManyPostsMiddlewares, (req, res) => buildGetManyPosts().handle(req, res));

router.get("/posts/:id", ...getOnePostMiddlewares, (req, res) => buildGetOnePost().handle(req, res));

router.get("/posts/:post_id/image", (req, res) => buildGetPostImage().handle(req, res));

router.post("/posts/:post_id/comment", (req, res) => buildCreateComment().handle(req, res));

router.post("/posts/:post_id/like", (req, res) => buildCreateLike().handle(req, res));

router.post("/users/:user_id/followers", ensureAuth, (req, res) => buildFollowUser().handle(req, res));

export { router };