const User = require("../../../models/user");
const env = require("../../../config/environment");

const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json({
        message: "Invalid UserName or Password",
      });
    }

    return res.status(200).json({
      message: " SignIn successful, here is your token, Please keep it Safe!",
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
