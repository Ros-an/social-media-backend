const express = require("express");
const router = express.Router();

const { getPosts, createPost } = require("../controllers/post.controller");
const { requireSignin } = require("../controllers/auth.controller");

// using requireSignIn as middleware
router.get("/", requireSignin, getPosts);
router.post("/post", createPost);

module.exports = router;
