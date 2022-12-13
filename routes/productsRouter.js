const express = require('express');
const productsController = require('../controllers/productsController');
const registerController = require('../controllers/RegisterController');
const productsRouter = express.Router();

productsRouter.get("/", productsController.getAllproducts);
productsRouter.get("/:id", productsController.getProductById);

module.exports = productsRouter;
