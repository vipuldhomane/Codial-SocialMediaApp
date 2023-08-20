// router for posts_api
const express = require("express");
const router = express.Router();

const userApi = require("../../../controllers/api/v1/users_api"); // define the route for the api

router.post("/create-session", userApi.createSession);

module.exports = router;
