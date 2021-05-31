const express = require("express");
const router = express.Router();

const { getPosts, createPost } = require("../controllers/post.controller");
const { requireSignin } = require("../controllers/auth.controller");
const { userById } = require("../controllers/user.controller");

// using requireSignIn as middleware
router.get("/", getPosts);
router.post("/post", requireSignin, createPost);

router.param("userId", userById);

module.exports = router;
