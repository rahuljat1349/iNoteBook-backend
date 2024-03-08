const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "rahul@sign";

const handleCreateUser = async (req, res) => {
  // validation
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  // if user already exists
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({ error: "email already exists!" });
    }

    // adding user
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = new User({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    let result = await user.save();

    // sending token
    const data = user.id;
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.json({ authToken });
    console.log(result);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleLogin = async (req, res) => {
  // validation
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  // checking if the user exists
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "email or password is wrong" });
    }
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ error: "email or password is wrong" });
    }

    // sending token if user exists
    const data = user.id;
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.json({ authToken });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleGetUser = async (req, res) => {
  try {
    userId = req.user;
    const user = await User.findById(userId).select("-password");
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleCreateUser,
  handleLogin,
  handleGetUser,
};
