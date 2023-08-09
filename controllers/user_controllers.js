const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile",
  });
};

module.exports.user = (req, res) => {
  res.end("<h1>This is user route</h1>");
};

// render the signUp page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codial | sign Up",
  });
};

// render the signUp page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codial | sign In",
  });
};

// get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in signing up:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// module.exports.create = function (req, res) {
//   if (req.body.password != req.body.confirm_password) {
//     return res.redirect("back");
//   }
//   User.findOne({ email: req.body.email }, function (error, user) {
//     if (error) {
//       console.log("error in finding user in signing up");
//       return;
//     }
//     if (!user) {
//       User.create(req.body, function (err, user) {
//         if (err) {
//           console.log("error in finding user in signing up");
//           return;
//         }
//         return res.redirect("/users/sign-in");
//       });
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

module.exports.createSession = function (req, res) {
  // ToDo later
};
