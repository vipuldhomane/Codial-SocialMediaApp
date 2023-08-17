const router = require("../routes");

const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  // console.log(req.user);
  // console.log("Home Called");
  try {
    const posts = await Post.find({})
      .populate("user") // Populate the user field in the Post model
      .populate({
        path: "comments",
        populate: {
          path: "user", // Populate the user field in the Comment model
        },
      });
    // .exec();
    // find all the users to show on home screen
    const users = await User.find({});
    return res.render("home", {
      title: "Codial | Home",
      posts: posts,
      user: req.user,
      all_users: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
