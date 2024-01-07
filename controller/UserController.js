const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//user register
const CreatingUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const check = await User.findOne({ email });
    if (!check) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const create = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(200).send("User is created successfully...");
    } else {
      res
        .status(400)
        .json({ error: "user name is already used try another one.." });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//user login
const LoggingInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCheck = await User.findOne({ email });
    if (!userCheck) {
      res
        .status(400)
        .json({ error: "User is not registered please register!" });
    } else {
      const passwordCheck = await bcrypt.compare(password, userCheck.password);
      if (!passwordCheck) {
        res.status(400).json({ error: "password missmatch check and update!" });
      } else {
        const payload = {
          id: userCheck._id,
          user: userCheck.name,
          email: userCheck.email,
        };
        const token = await jwt.sign(payload, process.env.screat_token);
        res.status(200).json({ jwt_token: token });
      }
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { CreatingUser, LoggingInUser };
