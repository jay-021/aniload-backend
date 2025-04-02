const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("something went wrong !");
    console.log("get all user", error);
  }
};

const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "Email already exists!" });
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
    });

    await user.save();

    res.send({ message: "user created successfully." });
  } catch (error) {
    res.status(500).send("something went wrong !");
    console.log("signUpUser", error);
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser) {
      const isMatchPassword = await bcrypt.compare(password, findUser.password);
      if (isMatchPassword) {
        const token = jwt.sign(
          {
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: "user",
          },
          process.env.SECRETKEY,
          {
            expiresIn: "7d",
          }
        );

        res.send({
          token: token,
          status: 200,
          message: "user signin successfully",
        });
      } else {
        res.status(401).send({ message: "email or password not valid !" });
      }
    } else {
      res.status(401).send({ message: "email or password not valid !" });
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong !" });
    console.log("signUpUser", error);
  }
};

const verifyUser = async (req, res) => {
  try {
    const { _id } = req.authUserId;
    const isValidUser = await User.findOne({ _id });
    if (isValidUser) {
      res.send({
        status: 200,
        message: "verify successfully",
      });
    } else {
      res.send({
        status: 401,
        message: "Unauthorized user",
      });
    }
  } catch (error) {
    res.status(500).send("something went wrong !");
    console.log("signUpUser", error);
  }
};

module.exports = { user, signUpUser, signInUser, verifyUser };
