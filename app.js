const express = require("express");
const connectDB = require("./connection");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const postRoute = require("./routes/postRoute");

const bodyParser = require("body-parser");

require("dotenv").config();
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOpts));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/admin", adminRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started...`);
});
