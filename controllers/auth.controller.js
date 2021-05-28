const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

const signUp = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(403).json({
        success: false,
        message: "Email is taken!",
      });
    }
    const user = req.body;
    const newUser = await new User(user);
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "Registration Successful! Please login.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "could not save you data, for more detail see error message",
      errorMessage: err.message,
    });
  }
};

const signin = async (req, res) => {
  // find the user based on email
  //If error or no user - do something else
  // If user found - authenticate(password match)
  // Correct email and password - generate token with secret and userid
  // persist the token as "t" in cookie with expiry date
  // return response with user and token to FE client
};

module.exports = { signUp };
