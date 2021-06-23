const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
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

    //If error or no user - do something else
    if (!user) {
      return res.status(403).json({
        success: false,
        message: `User with ${email} does not exist. Please SignUp first!`,
      });
    }
    // If user found - authenticate(password don't match)
    if (!user.authenticate(password)) {
      return res.status(401).json({
        success: false,
        message: "password do not match.",
      });
    }
    // Correct email and password - generate token with secret and userid
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as "t" in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 86400 });

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

const signOut = (req, res) => {
  res.clearCookie("t");
  return res.json({
    success: true,
    message: "Signout Successful!",
  });
};
const requireSignin = expressJwt({
  // if the token is valid, then express-jwt appends verified user id in an auth key to the request object
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  // creating a prop userproperty, with this we can access the auth id to check the currently signedin user id
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  let authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      success: false,
      message: "User is not authorized!",
    });
  }
  next();
};

module.exports = { signUp, signIn, signOut, requireSignin, hasAuthorization };
