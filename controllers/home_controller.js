const router = require("../routes");

const Post = require("../models/post");
// module.exports.home = async function (req, res) {
//   posts = await Post.find({})
//     .populate("user")
//     .exec(function (err, posts) {
//       return res.render("home", {
//         title: "Codial | Home",
//         posts: posts,
//       });
//     });
// };
module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({}).populate("user").exec();
    return res.render("home", {
      title: "Codial | Home",
      posts: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error"); // You can customize the error handling as needed
  }
};
