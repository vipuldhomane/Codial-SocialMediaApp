// router for posts_api
const express = require("express");
const passport = require("passport");
const router = express.Router();

const postsApi = require("../../../controllers/api/v1/post_api"); // define the route for the api

router.get("/", postsApi.index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsApi.destroy
);

module.exports = router;
