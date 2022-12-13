const express = require('express');
const registerController = require('../controllers/RegisterController');
const registerRouter = express.Router();


registerRouter.post("/register", registerController.register);
registerRouter.post("/login", registerController.login);


module.exports = registerRouter;