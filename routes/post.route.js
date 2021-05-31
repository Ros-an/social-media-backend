const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  postsByUser,
} = require("../controllers/post.controller");
const { requireSignin } = require("../controllers/auth.controller");
const { userById } = require("../controllers/user.controller");

// using requireSignIn as middleware
router.get("/posts", getPosts);
router.post("/post/new/:userId", requireSignin, createPost);
router.get("/posts/user/:userId", requireSignin, postsByUser);

router.param("userId", userById);

module.exports = router;
