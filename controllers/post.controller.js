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

const createPost = (req, res) => {
  const post = new Post(req.body);
  post.save((err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err,
      });
    }
    res.status(200).json({
      success: true,
      post,
    });
  });
};

module.exports = { getPosts, createPost };
