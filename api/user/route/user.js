const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const auth = require("../../../config/auth")

userRouter.post("/register", userController.registerNewUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/me", auth, userController.getUserDetails);

module.exports = userRouter;