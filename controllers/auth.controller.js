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
      user: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "could not save you data, for more detail see error message",
      errorMessage: err.message,
    });
  }
};

module.exports = { signUp };
