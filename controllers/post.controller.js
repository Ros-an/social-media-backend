const Post = require("../models/post.model");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().select("_id title body");
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

const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new Post(post);
    const savedPost = await newPost.save();
    res.status(201).json({
      success: true,
      post: savedPost,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "post not added to database, see error message for more details",
      erroMessage: err.message,
    });
  }
};

module.exports = { getPosts, createPost };
