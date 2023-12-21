const express = require("express");
const {
  admin,
  signInAdmin,
  signUpAdmin,
} = require("../controller/adminController");
const adminAuth = require("../middleware/adminAuth");
const route = express.Router();

route.get("/dashboard", adminAuth, admin);
route.post("/signin", signInAdmin);
route.post("/signup", signUpAdmin);

module.exports = route;
