const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(200).json({ status: true, message: "Registered Successfully" });
  } catch (error) {
    console.log("Signup error", error.message);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    //console.log("user", user);

    if (!user)
      return res.status(404).json({ status: false, message: "Invalid User" });

    // console.log("user", user);
    const token = jwt.sign({ userId: user._id }, process.env._SECRETKEY);

    return res.status(201).json({ status: true, token: token, data: user });
  } catch (error) {
    console.log("login error", error.message);
    res
      .status(500)
      .json({ status: false, message: "Email/Password incorrect" });
  }
};

module.exports = { Register, Login };
