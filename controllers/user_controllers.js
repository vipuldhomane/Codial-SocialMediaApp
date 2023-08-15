const User = require("../models/user");

module.exports.profile = async function (req, res) {
  // console.log(req.user);

  const user = await User.findById(req.params.id);
  // console.log(user);
  return res.render("user_profile", {
    title: "User Profile",
    profile_user: user,
    user: req.user,
  });
};

module.exports.user = (req, res) => {
  res.end("<h1>This is user route</h1>");
};

// render the signUp page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codial | sign Up",
  });
};

// render the signUp page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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

module.exports.createSession = function (req, res) {
  return res.redirect("/users/profile");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("error in signout");
    }
  });
  return res.redirect("/");
};
module.exports.update = async function (req, res) {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};
