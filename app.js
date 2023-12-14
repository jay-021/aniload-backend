const express = require("express");
const connectDB = require("./connection");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const PORT = 4000;

const bodyParser = require("body-parser");
require("dotenv").config();
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(cors(corsOpts));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/user", userRoute);
app.use("/post", postRoute);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
