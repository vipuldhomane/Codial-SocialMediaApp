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
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
};
