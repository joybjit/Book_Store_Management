const { body, query, param } = require("express-validator");

const authValidator = {
  signup: [
    body("email")
      .exists()
      .withMessage("Email must be provided")
      .bail()
      .isString()
      .withMessage("Email must be string")
      .bail()
      .isEmail()
      .withMessage("Email must be in valid format"),
    body("password")
      .exists()
      .withMessage("Password must be provided")
      .bail()
      .isString()
      .withMessage("Password must be string")
      .bail()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .withMessage(
        "Password must contain min 8 characters, min 1 lowercase, min 1 uppercase, min 1 symbol, min 1 number"
      ),
  ],
};
const isValid = {
  addToCart: [
    body("userId")
      .exists()
      .withMessage("User ID must be provided")
      .bail()
      .matches(/^[a-f\d]{24}$/i)
      .withMessage("Invalid ID Format"),
    body("productId")
      .exists()
      .withMessage("Product ID must be provided")
      .bail()
      .matches(/^[a-f\d]{24}$/i)
      .withMessage("Invalid ID Format"),
    body("amount")
      .exists()
      .withMessage("Product Quantity must be provided")
      .bail()
      .isInt({ min: 1 })
      .withMessage("Quantity must be Greater than or Equal to One"),
  ],
};

module.exports = { authValidator, isValid };
