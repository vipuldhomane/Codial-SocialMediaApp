const express = require("express");
const router = express.Router();
// This is for route /user
// Anything after /user/ can be written here
const usersController = require("../controllers/user_controllers");

router.get("/profile", usersController.profile);
router.get("/", usersController.user);

module.exports = router;
