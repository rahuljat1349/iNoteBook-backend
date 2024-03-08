const { body, validationResult } = require("express-validator");

const validateNote = [
  body("title", "enter a valid title").isLength({ min: 3 }),
  body("description", "description must be at least 5 characters").isLength({
    min: 5,
  }),
];
module.exports = {
  validateNote,
};
