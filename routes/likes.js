const express = require("express");

const router = express.Router();
const likeController = require("../Controllers/likes_Controller");

router.post("/toggle", likeController.toggleLike);

module.exports = router;
