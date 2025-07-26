import express from "express";
import { getUserDetail } from "../controllers/user.controllers.js";
import { isAuth } from "../middleware/isAuth.js";
const userRouter = express.Router();
userRouter.get("/currentUser",isAuth, getUserDetail);

export default userRouter;
