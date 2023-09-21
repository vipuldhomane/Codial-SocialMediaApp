const User = require("../models/user");
const fs = require("fs");
const path = require("path");

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
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error in signout:", err);
      // Handle the error if needed
      return res.redirect("back");
    }

    // Flash message
    req.flash("success", "Logged Out Successfully");

    return res.redirect("/");
  });
};

module.exports.update = async function (req, res) {
  // check if the user making request is same as the profile to be updated
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);

      // accessing the uploaded image with the help of multer
      // uploadedAvatar is defined in the user model
      User.uploadedAvatar(req, res, function (error) {
        if (error) {
          console.log(`***Multer Error : ${error}`);
        }
        user.name = req.body.name;
        user.email = req.body.email;

        //see if the avatar already exists the delete the previous one. then add the new one.

        if (req.file) {
          let filePath = path.join(__dirname, "..", user.avatar);
          // let filePath = path.join(__dirname, "..", user["avatar"]);

          // console.log(fs.existsSync(filePath));
          // console.log(filePath);

          if (user.avatar && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // the path is stored in the user.avatar in user model
          }
          // this is saving the path (String) of the uploaded file to the avatar avatar field of user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        // console.log(req.file);

        user.save();
        req.flash("success", "Updated Successfully");
        return res.redirect("back");
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    req.flash("error", "User does not match");
    console.log("User signed in");
  }
};
