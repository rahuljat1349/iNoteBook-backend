const jwt = require("jsonwebtoken");
const JWT_SECRET = "rahul@sign";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("please authenticate using a valid token");
  }
  try {
    const id = jwt.verify(token, JWT_SECRET);
    req.user = id;
  } catch (error) {
    return res.status(401).send("please authenticate using a valid token");
  }
  next();   
};

module.exports = fetchuser;
