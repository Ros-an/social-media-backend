const express = require("express");
const router = express.Router();

const {
  userById,
  allUsers,
  singleUser,
} = require("../controllers/user.controller");
const { requireSignin } = require("../controllers/auth.controller");

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, singleUser);

//  declaring a middleware to get all userId related api calls, any route containing :userId our app will 1st execute userById()
router.param("userId", userById);

module.exports = router;
