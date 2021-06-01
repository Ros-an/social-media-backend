const _ = require("lodash");
const User = require("../models/user.model");

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email createdAt updatedAt");
    res.json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "could not retrieve users, for more details see error message",
      errorMessage: err.message,
    });
  }
};

exports.singleUser = async (req, res) => {
  try {
    const user = req.profile;
    user.salt = undefined;
    user.hashed_password = undefined;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        "Error while retrieving data, refer to error message for more details",
      errorMessage: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let user = req.profile;
    const updatedUser = req.body;
    user = _.extend(user, updatedUser);
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    console.log("user", user);
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Error during update, for more check error  message",
      errorMessage: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = req.profile;
    await user.remove();
    res.json({
      success: true,
      message: "Your account has been deleted successfully!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "user not deleted, for more check the error message",
      errorMessage: err.message,
    });
  }
};
exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }
    // adds profile prop to req object with user info
    req.profile = user;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while retrieving user, for more detail see error message",
      errorMessage: err.Message,
    });
  }
};
