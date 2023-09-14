const express = require("express");
const route = express();
const bookController = require("../controller/bookController");
const { authentication, isAdmin } = require("../middleware/auth");

route.get("/all", bookController.getAll);
route.get("/filter", bookController.getAllByFilter);
route.post("/create", authentication, isAdmin, bookController.create);

module.exports = route;
