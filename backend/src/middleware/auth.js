const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const dotenv = require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env._SECRETKEY);

    if (!decoded)
      return res.status(404).json({ status: false, message: "Invalid Token" });

    let user = await User.findOne({ _id: decoded.userId });

    if (user) {
      next();
    } else {
      res.status(404).json({ status: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something Went Wrong" });
  }
};

module.exports = { authenticate };
