const express = require("express");
const router = express.Router();
const passport = require("passport");
// This is for route /user
// Anything after /user/ can be written here
const usersController = require("../controllers/user_controllers");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);
router.get("/profile", passport.checkAuthentication, usersController.profile);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);

// Render the sign up page
router.get("/sign-up", usersController.signUp);

// Render the sign in page
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

router.get("/sign-out", usersController.destroySession);
// use passport as middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

// Google Authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/sign-in" }),
  usersController.createSession
);

module.exports = router;
