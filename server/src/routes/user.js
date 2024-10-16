import express from "express";
import {
  createUser,
  getUsers,
  login,
  getUserInfo,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.post("/profile", getUserInfo);

export default userRouter;
