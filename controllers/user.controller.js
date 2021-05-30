const User = require("../models/user.model");

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
    res.status(400).json({
      success: false,
      message: "Error while retrieving user, for more detail see error message",
      errorMessage: err.Message,
    });
  }
};
