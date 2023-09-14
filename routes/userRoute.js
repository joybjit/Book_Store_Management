const express = require("express");
const route = express();
const userController = require("../controller/userController");
const { authentication, isAdmin } = require("../middleware/auth");

route.get("/all", authentication, isAdmin, userController.getAll);

module.exports = route;
