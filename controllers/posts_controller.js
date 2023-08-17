const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.post = async function (req, res) {
  // here the id is stored in req.user because of using serialization
  // req.body._id wont work as it does not exists
  // console.log(req.user);
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash("success", "Post Created Successfully");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "Cannot Crete Post");
    console.log(err);
  }
};

module.exports.destroy = async function (req, res) {
  // console.log(req.user.id);
  try {
    const post = await Post.findById(req.params.id);
    // .id means converting the object id "._id" to string
    // see if the user who made the delete req is same as post user
    if (post.user == req.user.id) {
      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post Deleted Successfully");
      return res.redirect("back");
    } else {
      req.flash("error", "Cannot Delete Post");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
  }
};
