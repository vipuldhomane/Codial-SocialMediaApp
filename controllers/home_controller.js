const router = require("../routes");

module.exports.home = function (req, res) {
  return res.end("<h1> Express is up for Codial</h1>");
};

module.exports.actionName = function (req, res) {
  return res.end("<h1> This is Actions</h1>");
};
