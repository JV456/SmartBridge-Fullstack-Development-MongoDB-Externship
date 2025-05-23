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
    transactionController.getFilteredTransactions
);
//!update
transactionRouter.put(
    "/api/v1/transactions/update/:id", 
    isAuthenticated,
    transactionController.update
);
//!delete
transactionRouter.delete(
    "/api/v1/transactions/delete/:id", 
    isAuthenticated,
    transactionController.delete
);


module.exports = transactionRouter;