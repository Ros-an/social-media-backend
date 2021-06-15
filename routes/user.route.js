const express = require("express");
const router = express.Router();

const {
  userById,
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
  userPhoto,
  userDataForEdit,
  backgroundImage,
} = require("../controllers/user.controller");
const {
  requireSignin,
  hasAuthorization,
} = require("../controllers/auth.controller");

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, singleUser);
router.get("/user/edit/:userId", requireSignin, userDataForEdit);
router.get("/user/photo/:userId", userPhoto);
router.get("/user/background/:userId", backgroundImage);
router.post("/user/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);

//  declaring a middleware to get all userId related api calls, any route containing :userId our app will 1st execute userById()
router.param("userId", userById);

module.exports = router;
