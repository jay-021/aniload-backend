const express = require("express");
const {
  user,
  signUpUser,
  signInUser,
  verifyUser,
} = require("../controller/userController");
const userAuth = require("../middleware/userAuth");
const route = express.Router();

route.get("/", userAuth, user);
route.post("/signup", signUpUser);
route.post("/signin", signInUser);
// route.get("/verify", userAuth, verifyUser);

module.exports = route;
