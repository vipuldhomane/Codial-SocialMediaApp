const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");
const env = require("./environment");

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      console.log("Error in finding user from JWT");
      return done(error, false);
    }
  })
);

module.exports = passport;
