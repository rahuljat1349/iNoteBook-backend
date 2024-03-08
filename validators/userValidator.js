const { body, validationResult } = require("express-validator");

const validateCreateUser = [
  body("name", "enter a valid name").isLength({ min: 3 }),
  body("email", "enter a valid email").isEmail(),
  body("password", "password must be at least 6 characters").isLength({
    min: 6,
  }),
];
const validateLogin = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];
module.exports = {
  validateCreateUser,
  validateLogin,
};
