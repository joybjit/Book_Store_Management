const express = require("express");
const route = express();
const reviewRatingController = require("../controller/reviewRatingController");

route.post("/add", reviewRatingController.addReviewRating);
route.patch("/edit", reviewRatingController.editReview);
route.post("/remove", reviewRatingController.removeReviewRating);

module.exports = route;
