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

const signIn = async (req, res) => {
  // find the user based on email
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    //If error or no user - do something else
    if (!user) {
      return res.status(403).json({
        success: false,
        message: `User with ${email} does not exist. Please SignUp`,
      });
    }
    // If user found - authenticate(password don't match)
    if (!user.authenticate(password)) {
      return res.status(401).json({
        success: false,
        message: "Email and password do not match.",
      });
    }
    // Correct email and password - generate token with secret and userid
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });

    // persist the token as "t" in cookie with expiry date
    // res.cookie("t", token, { expire: new Date() + 86400 });

    // return response with user and token to FE client
    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `something went wrong, see error message for more details`,
      errorMessage: err.message,
    });
  }
};

module.exports = { signUp, signIn };
