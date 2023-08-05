const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

// This is the main index router all the routes will be defined here and further routing calls will be made from here.

router.get("/", homeController.home);
router.use("/users", require("./users"));

console.log("router loaded");

module.exports = router;
