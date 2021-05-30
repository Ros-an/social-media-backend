const express = require("express");
const router = express.Router();

const { signUp, signIn, signOut } = require("../controllers/auth.controller");
const { userById } = require("../controllers/user.controller");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

//  declaring a middleware to get all userId related api calls, any route containing :userId our app will 1st execute userById()
router.param("userId", userById);

module.exports = router;
