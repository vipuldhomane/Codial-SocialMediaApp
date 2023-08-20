// this is main api calls handler which will be further linked to other version handlers
const express = require("express");
const router = express.Router();

// define the router for v1
router.use("/v1", require("./v1"));

module.exports = router;
