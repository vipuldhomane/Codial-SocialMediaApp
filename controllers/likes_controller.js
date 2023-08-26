const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async function (req, res) {
  try {
    //likes/toggleLike/?id=asdfasd&type=post
    let likeable;
    let deleted = false;

    // check if the like is made on post or comment. populate the likes to that schema where like request is made
    if (req.query.type == "post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    // check if the like already exits
    let existingLike = await Like.findOne({
      likeable: req.query._id, // check the id of post or comment
      onModel: req.query.type, // check the type of schema
      user: req.user.id, // check the user id of the user
    });

    // if a like is already made then delete that like
    if (existingLike) {
      // pull the like form the array
      likeable.likes.pull(existingLike._id);
      likeable.save();
      Like.deleteOne({ _id: existingLike._id });
      // existingLike.remove();
      deleted = true;
    } else {
      // make a new like
      let newLike = await Like.create({
        user: req.user._id, // which user made a like
        likeable: req.query.id, // on which type of model like is made
        onModel: req.query.type, //on which type of model like has to be made
      });
      likeable.likes.push(newLike._id);
      likeable.save();
    }

    return res.status(200).json({
      message: "Request Successful",
      data: {
        deleted: deleted,
      },
    });
  } catch (error) {
    console.log("error");
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
