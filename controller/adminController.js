const Admin = require("../model/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const admin = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.send(admin);
  } catch (error) {
    res.status(500).send("something went wrong !");
    console.log("get all admins", error);
  }
};

const signUpAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).send({ message: "Email already exists!" });
    }

    const admin = new Admin({
      name: name,
      email: email,
      password: password,
      is_Admin: true,
    });

    await admin.save();

    res.send({ message: "user created successfully." });
  } catch (error) {
    res.status(500).send("something went wrong !");
    console.log("signUpAdmin", error);
  }
};

const signInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findAdmin = await Admin.findOne({ email });
    console.log(findAdmin);

    if (findAdmin) {
      const isMatchPassword = await bcrypt.compare(
        password,
        findAdmin.password
      );
      if (isMatchPassword) {
        const token = jwt.sign(
          {
            _id: findAdmin._id,
            name: findAdmin.name,
            email: findAdmin.email,
            role: "admin",
          },
          process.env.ADMINKEY,
          {
            expiresIn: "7d",
          }
        );

        res.send({
          token: token,
          status: 200,
          message: "Admin signin successfully",
        });
      } else {
        res.status(401).send({ message: "email not valid !" });
      }
    } else {
      res.status(401).send({ message: " password not valid !" });
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong !" });
  }
};

module.exports = { admin, signInAdmin, signUpAdmin };
