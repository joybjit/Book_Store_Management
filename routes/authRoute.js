const express = require("express");
const route = express();
const authController = require("../controller/authController");
const { authValidator } = require("../middleware/validator");

route.post("/signup", authValidator.signup, authController.signup);
route.post("/login", authValidator.login, authController.login);

module.exports = route;
