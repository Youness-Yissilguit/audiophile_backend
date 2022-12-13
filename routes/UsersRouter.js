const express = require('express');
const usersController = require('../controllers/userController');
const registerController = require('../controllers/RegisterController');
const userRouter = express.Router();


userRouter.use(registerController.isLogin);//midleware for login
userRouter.get("/", usersController.profil);

module.exports = userRouter;