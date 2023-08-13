const router = require("../routes");

const Post = require("../models/post");
// module.exports.home = async function (req, res) {
//   try {
//     const posts = await Post.find({}).populate("user").exec(); // Add the missing closing parenthesis here
//     return res.render("home", {
//       title: "Codial | Home",
//       posts: posts,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send("Internal Server Error"); // You might want to send an appropriate response in case of an error
//   }
// };
module.exports.home = async function (req, res) {
  // console.log(req.user);
  try {
    const post = await Post.find({}).populate("user").exec();
    return res.render("home", {
      title: "Codial | Home",
      posts: post,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};
