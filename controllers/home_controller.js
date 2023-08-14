const router = require("../routes");

const Post = require("../models/post");

module.exports.home = async function (req, res) {
  // console.log(req.user);
  try {
    const posts = await Post.find({})
      .populate("user") // Populate the user field in the Post model
      .populate({
        path: "comments",
        populate: {
          path: "user", // Populate the user field in the Comment model
        },
      })
      .exec();

    return res.render("home", {
      title: "Codial | Home",
      posts: posts,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
