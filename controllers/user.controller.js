const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const User = require("../models/user.model");

// logic to get all users
exports.allUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "name email userphoto createdAt updatedAt"
    );
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
// logic for single user
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
// data for edit
exports.userDataForEdit = async (req, res) => {
  try {
    const user = req.profile;
    user.salt = undefined;
    user.hashed_password = undefined;
    user.background = undefined;
    user.userphoto = undefined;
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

// logic for separate user photo
exports.userPhoto = (req, res, next) => {
  if (req.profile.userphoto.data) {
    res.set("Content-Type", req.profile.userphoto.contentType);
    return res.send(req.profile.userphoto.data);
  }
  next();
};
// logic for background image
exports.backgroundImage = (req, res, next) => {
  if (req.profile.background.data) {
    res.set("Content-Type", req.profile.background.contentType);
    return res.send(req.profile.background.data);
  }
  next();
};
// logic of updating user's detail
// exports.updateUser = async (req, res) => {
//   try {
//     let user = req.profile;
//     const updatedUser = req.body;
//     //checking whether the updated email already exist or not
//     const userExist = await User.findOne({ email: updatedUser.email });
//     if (userExist && userExist.email !== user.email) {
//       return res.status(403).json({
//         success: false,
//         message: "Email is taken!",
//       });
//     }
//     user = _.extend(user, updatedUser);
//     await user.save();
//     user.hashed_password = undefined;
//     user.salt = undefined;
//     console.log("user", user);
//     res.json({
//       success: true,
//       user,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       error: "Error during update, for detail check error  message at console",
//       errorMessage: err.message,
//     });
//   }
// };
exports.updateUser = async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Image could not be uploaded.",
        errorMessage: err.message,
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);
    // await user.save();
    if (files.userphoto) {
      user.userphoto.data = fs.readFileSync(files.userphoto.path);
      user.userphoto.contentType = files.userphoto.type;
    }
    if (files.background) {
      user.background.data = fs.readFileSync(files.background.path);
      user.background.contentType = files.background.type;
    }
    try {
      let result = await user.save();
      // result.hashed_password = undefined;
      // result.salt = undefined;
      // result.createdAt = undefined;
      // result.updatedAt = undefined;
      // result.__v = undefined;
      console.log("ye le result", result);
      res.json({
        success: true,
        message: "user detail has been updated",
      });
    } catch (err) {
      res.json({
        success: false,
        error: "Error during update, for detail check console",
        errorMessage: err.message,
      });
    }
  });
};
// logic of deleting user account
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

// logic of router param of finding user by id
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
