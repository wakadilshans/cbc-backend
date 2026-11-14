import express from "express";
import { createUser, loginUser } from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser); //login wlt get rq dn na securtity adu nisa , ek nisa dnne post

export default userRouter;