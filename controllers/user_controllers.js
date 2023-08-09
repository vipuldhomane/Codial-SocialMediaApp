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
    title: "Codial | sign IN",
  });
};
