require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split("Bearer ")[1];

    console.log("token from  userAuth", token);
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    console.log("Decoded token from userAuth", decoded);
    req.authUserId = { _id: decoded._id };
    next();
  } catch (error) {
    console.log("Error in verify:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        status: 401,
        message: "Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).send({
        status: 401,
        message: "Invalid token",
      });
    }
    res.status(500).send("Something went wrong!");
  }
};

module.exports = userAuth;
