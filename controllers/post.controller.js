const Post = require("../models/post.model");
const formidable = require("formidable");
const fs = require("fs");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
      .select("_id title body");
    res.json({
      success: true,
      posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "could not retrieve data",
      errorMessage: err.message,
    });
  }
};

const createPost = async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Image could not be uploaded.",
        errorMessage: err.message,
      });
    }
    // these fields are columns/attributes(sql) in table/collection
    let post = new Post(fields);
    const user = req.profile;
    user.hashed_password = undefined;
    user.salt = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    user.__v = undefined;
    post.postedBy = user;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    try {
      let result = await post.save();
      res.json({
        success: true,
        result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message:
          "post not added to database, see error message for more details",
        erroMessage: err.message,
      });
    }
  });
};

const postsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.profile._id })
      .populate("postedBy", "_id name")
      .sort("createdAt");
    res.json({
      success: true,
      posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "could not retrieve post",
      errorMessage: err.message,
    });
  }
};
module.exports = { getPosts, createPost, postsByUser };
