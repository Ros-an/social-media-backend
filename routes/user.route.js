const express = require("express");
const router = express.Router();

const { userById, allUsers } = require("../controllers/user.controller");

router.get("/users", allUsers);

//  declaring a middleware to get all userId related api calls, any route containing :userId our app will 1st execute userById()
router.param("userId", userById);

module.exports = router;
