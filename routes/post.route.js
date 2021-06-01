const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPostOfUser,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");
const { requireSignin } = require("../controllers/auth.controller");
const { userById } = require("../controllers/user.controller");

// using requireSignIn and isPostOfUser as middleware
router.get("/posts", getPosts);
router.post("/post/new/:userId", requireSignin, createPost);
router.get("/posts/by_user/:userId", requireSignin, postsByUser);
router.delete("/post/:postId", requireSignin, isPostOfUser, deletePost);
router.post("/post/:postId", requireSignin, isPostOfUser, updatePost);

router.param("postId", postById);
router.param("userId", userById);

module.exports = router;
