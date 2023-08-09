const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

// This is the main index router all the routes will be defined here and further routing calls will be made from here.

router.get("/", homeController.home);

// define the other routes
router.use("/users", require("./users"));

router.use("/posts", require("./posts"));

// console.log("router loaded");

module.exports = router;
