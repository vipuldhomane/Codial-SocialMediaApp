module.exports.profile = function (req, res) {
  res.end("<h1>User Profile</h1>");
};

module.exports.user = (req, res) => {
  res.end("<h1>This is user route</h1>");
};
