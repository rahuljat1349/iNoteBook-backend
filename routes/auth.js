const express = require("express");
const router = express.Router();

const fetchuser = require("../middlewares/fetchuser");
const {
  validateCreateUser,
  validateLogin,
} = require("../validators/userValidator");
const {
  handleLogin,
  handleCreateUser,
  handleGetUser,
} = require("../controllers/User");

// Route 1: create a user using POST => api/auth/signup
router.post("/signup", validateCreateUser, handleCreateUser);

//Route 2: authenticate a user using POST => api/auth/login
router.post("/login", validateLogin, handleLogin);

// Route 3: get user info (login required)
router.post("/getuser", fetchuser, handleGetUser);

module.exports = router;
