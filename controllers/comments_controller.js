const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);

    // if post exits create a new comment with comment schema
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id, // user id is stored in the user object which is serialized by passport
      });
      // Add the comment in the comments array created in post so that comment can be shown below the post

      post.comments.push(comment);
      await post.save();
      req.flash("success", "Comment Created Successfully");
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      //save the postId to delete from the array of post
      let postId = comment.user;
      //delete the comment
      await comment.deleteOne();
      // console.log("delete comments");
      // remove the comment id from the post comments array
      await Post.findByIdAndUpdate(postId, { comments: req.params.id });
      req.flash("success", "Comment Deleted Successfully");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {}
};
