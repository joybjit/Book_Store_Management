const express = require("express");
const route = express();
const walletController = require("../controller/walletController");

route.post("/add-balance", walletController.addBalance);
route.get("/balance", walletController.balanceCheck);

module.exports = route;
