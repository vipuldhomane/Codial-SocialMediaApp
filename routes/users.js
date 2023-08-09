const express = require("express");
const router = express.Router();
// This is for route /user
// Anything after /user/ can be written here
const usersController = require("../controllers/user_controllers");

router.get("/profile", usersController.profile);

// Render the sign up page
router.get("/sign-up", usersController.signUp);

// Render the sign in page
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

module.exports = router;
