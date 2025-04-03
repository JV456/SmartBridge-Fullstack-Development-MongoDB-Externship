const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const transactionRouter = express.Router();
const transactionController = require("../controllers/transactionCtrl");

//!add
transactionRouter.post(
    "/api/v1/transactions/create",
    isAuthenticated, 
    transactionController.create
);
//!lists
transactionRouter.get(
    "/api/v1/transactions/lists", 
    isAuthenticated,
    transactionController.lists
);


module.exports = transactionRouter;