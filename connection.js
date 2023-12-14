const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://127.0.0.1:27017/userAuth";

    mongoose.connect(mongoURI);

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
