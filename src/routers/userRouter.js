import express from "express";
import { getEdit, postEdit,remove, logout, see, getChangePassword, postChangePassword,
    startGithubLogin, finishGithubLogin } from "../controllers/userController";
import { avatarUpload, protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout",protectorMiddleware ,logout);
userRouter.route("/edit").
all(protectorMiddleware).
get(getEdit).
post(avatarUpload.single("avatar"),postEdit);
userRouter.route("/change-password").
all(protectorMiddleware).
get(getChangePassword).
post(postChangePassword);
userRouter.get("/remove", remove);
userRouter.get("/github/start", publicOnlyMiddleware,startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware,finishGithubLogin);
userRouter.get("/:id([0-9a-f]{24})",see);

export default userRouter;