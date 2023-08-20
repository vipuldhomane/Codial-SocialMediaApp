const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

// This file is like controller for v1
module.exports.index = async function (req, res) {
  const posts = await Post.find({})
    .sort("-createdAt") //sort in reverse order of created at
    .populate("user") // Populate the user field in the Post model
    .populate({
      path: "comments",
      populate: {
        path: "user", // Populate the user field in the Comment model
      },
    });
  return res.status(200).json({
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  // console.log("destroyed");
  try {
    const post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });

      return res.status(200).json({
        message: "Post and associated comments deleted successfully",
      });
    } else {
      return res.status(401).json({
        message: "Cannot Delete Posts and Comments",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
