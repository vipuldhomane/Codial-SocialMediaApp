const Comment = require("../models/comment");
const Post = require("../models/post");
const Like = require("../models/like");
const commentsMailer = require("../mailers/comments_mailer");

// const queue = require("../config/kue");
// const commentEmailWorker = require("../workers/comment_email_worker");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);

    // if post exits create a new comment with comment schema
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id, // user id is stored in the user object which is serialized by passport
      });
      // Add the comment in the comments array created in post so that comment can be shown below the post
      comment = await comment.populate("user", "name email"); // populate name and user field in comment with name and email

      post.comments.push(comment);
      await post.save();

      commentsMailer.newComment(comment); //sending email on successful comment

      // run the command redis-server in wsl else it wont run
      // This block is dependent on the redis-server which needs to be started every single time
      // FIXME:
      // let job = queue.create("emails", comment).save(function (err) {
      //   if (err) {
      //     console.log("Error in sending to the queue", err);
      //     return;
      //   }
      //   console.log("job enqueued ", job.id);
      // });

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

      // Deleting all the likes associated  with the comments
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });

      // remove the comment id from the post comments array
      await Post.findByIdAndUpdate(postId, { comments: req.params.id });

      req.flash("success", "Comment Deleted Successfully");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {}
};
