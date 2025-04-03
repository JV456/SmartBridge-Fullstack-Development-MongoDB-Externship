const express = require("express");
const userController = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");
const categoryRouter = express.Router();

//!add
categoryRouter.post(
    "/api/v1/categories/create",
    isAuthenticated, 
    categoryController.create
);
//!lists
categoryRouter.get(
    "/api/v1/categories/lists", 
    isAuthenticated,
    categoryController.lists
);
//!Update
categoryRouter.put(
    "/api/v1/categories/update/:categoryId",
    isAuthenticated,
    categoryController.update
);
//!Delete
categoryRouter.delete(
    "/api/v1/categories/delete/:id", 
    isAuthenticated,
    categoryController.delete
);



module.exports = categoryRouter;