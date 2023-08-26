const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  // here the id is stored in req.user because of using serialization
  // req.body._id wont work as it does not exists
  // console.log(req.user);
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    //If the request is coming form the ajax
    if (req.xhr) {
      // console.log("ajax req");
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created",
      });
    }

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
      // Delete the associated likes for the post and all its comment's likes too
      await Like.deleteMany({ likeable: post, onModel: post });
      await Like.deleteMany({ _id: { $in: post.comments } }); //$in: This is a query operator in MongoDB. It checks if the value of the field specified on the left side of the operator matches any of the values in the array specified on the right side.

      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });

      // if Req is coming from the xhr or Ajax
      if (req.xhr) {
        // console.log("xhr running");
        return res.status(200).json({
          data: {
            post_id: req.params.id, // send the post id that will be used in deletePost function
          },
          message: "Post Deleted",
        });
      }

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
