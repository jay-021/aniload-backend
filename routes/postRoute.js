const express = require("express");
const { createPost, getByUserPost } = require("../controller/postController");
const userAuth = require("../middleware/userAuth");

const route = express.Router();

route.post("/create",userAuth, createPost);
route.get("/favourite",userAuth, getByUserPost);

module.exports = route; 