const Post = require("../models/post.model");

const getPosts = (req, res) => {
  res.json({
    post: [
      {
        post1: "my first post",
        post2: "my second post",
      },
    ],
  });
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
