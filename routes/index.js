const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

// This is the main index router all the routes will be defined here and further routing calls will be made from here.

// Main Route
router.get("/", homeController.home);

// define the other routes

// Users Route
router.use("/users", require("./users"));

// Posts Route
router.use("/posts", require("./posts"));

router.use("/comments", require("./comments"));

//handle the api
router.use("/api", require("./api"));

// console.log("router loaded");

module.exports = router;
