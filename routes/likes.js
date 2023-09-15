const express = require("express");

const router = express.Router();
const likeController = require("../controllers/likes_controller");

router.post("/toggle", likeController.toggleLike);

router.get("/", function (req, res) {
  return res.send("<h1>Likes</h1>");
});

module.exports = router;
