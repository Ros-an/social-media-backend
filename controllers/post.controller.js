const Post = require("../models/post.model");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

// gets post by id
const postById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id).populate("postedBy", "_id name");
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "no such post found",
      });
    }
    req.post = post;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while retrieving , for more see error message",
      errorMessage: err.message,
    });
  }
};

const singlePost = async (req, res) => {
  try {
    const post = req.post;
    res.status(200).json({
      success: true,
      post,
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

// middleware - to check authorization to make sure user delete/update only its own post
const isPostOfUser = (req, res, next) => {
  let userPost = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  // console.log("req.post", typeof req.post._id);
  // console.log("req.auth", typeof req.auth._id);
  if (!userPost) {
    return res.status(403).json({
      success: false,
      messsage: "User is not authorized!",
    });
  }
  next();
};

// function to get all the posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name userphoto")
      .select("_id post postphoto createdAt").sort("updatedAt");
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

// function to create post
const createPost = async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    // console.log("This is field", fields);
    // console.log("This is file", files);

    if (err) {
      return res.status(400).json({
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
    user.background = undefined;
    user.about = undefined;
    user.following = undefined;
    user.followers = undefined;
    // console.log("This is user 2", user);

    post.postedBy = user;
    // console.log("This is post", post);

    if (files.postphoto) {
      post.postphoto.data = fs.readFileSync(files.postphoto.path);
      post.postphoto.contentType = files.postphoto.type;
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

// funtion to find post of a user
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
// function to update post
// const updatePost = async (req, res) => {
//   try {
//     let post = req.post;
//     const updatedPost = req.body;
//     post = _.extend(post, updatedPost);
//     await post.save();
//     console.log("hya update", post);
//     res.json({
//       success: true,
//       post,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: "post could not be updated, for detail see error message",
//       errorMessage: err.message,
//     });
//   }
// };
const updatePost = async (req, res, next) => {

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
    let post = req.post;
    post = _.extend(post, fields);

    if (files.postphoto) {
      post.postphoto.data = fs.readFileSync(files.postphoto.path);
      post.postphoto.contentType = files.postphoto.type;
    }
    try {
      let result = await post.save();
      res.json({
        success: true,
        message: "post updation successful!"
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
// function to delete post
const deletePost = async (req, res) => {
  try {
    let post = req.post;
    await post.remove();
    res.json({
      success: true,
      message: "Your post has been deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "could not delete post, for more see error message",
      errorMessage: err.message,
    });
  }
};
// post image
const postImage = (req, res, next) => {
  if (req.post.postphoto.data) {
    res.set("Content-Type", req.post.postphoto.contentType);
    return res.send(req.post.postphoto.data);
  }
  next();
};
module.exports = {
  getPosts,
  singlePost,
  createPost,
  postsByUser,
  postById,
  isPostOfUser,
  updatePost,
  deletePost,
  postImage,
};
