const Post = require("../models/post");

module.exports.post = async function (req, res) {
  // here the id is stored in req.user because of using serialization
  // req.body._id wont work as it does not exists
  console.log(req.user);
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    return res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};
