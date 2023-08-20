// this is main routing handler for v1. which will handle further calls made to particular version

const express = require("express");
const router = express.Router();

router.use("/posts", require("./posts"));
router.use("/users", require("./users"));

module.exports = router;
