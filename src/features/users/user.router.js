import express from "express";
import UserController from "./users.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/user/login', (req, res) => {
    userController.signIn(req, res)
})

export default userRouter
