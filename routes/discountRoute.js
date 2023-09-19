const express = require("express");
const route = express();
const discountController = require("../controller/discountController");
const { authentication, isAdmin } = require("../middleware/auth");
const { isValid } = require("../middleware/validator");

route.post(
  "/add",
  authentication,
  isAdmin,
  isValid.addDiscount,
  discountController.addDiscount
);
route.patch(
  "/update",
  authentication,
  isAdmin,
  isValid.updateDiscount,
  discountController.updateDiscount
);

module.exports = route;
