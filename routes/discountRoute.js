const express = require("express");
const route = express();
const discountController = require("../controller/discountController");
const { authentication, isAdmin } = require("../middleware/auth");

route.post("/add", authentication, isAdmin, discountController.addDiscount);
route.patch(
  "/update",
  authentication,
  isAdmin,
  discountController.updateDiscount
);

module.exports = route;
