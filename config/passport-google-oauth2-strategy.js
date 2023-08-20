const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");
const User = require("../models/user");

// Tell passport to use new strategy for google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "507267631010-p1hu0cth0oje04oa6q7olcb7d6r5j7ca.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // find a user
        const user = await User.findOne({ email: profile.emails[0].value });
        console.log(profile);
        if (user) {
          //if fond set this user as req.user
          return done(null, user);
        } else {
          //if not found then create the usr and set it as req.user
          try {
            await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            });
          } catch (error) {
            console.log("Error in google strategy-passport", error);
            return done(null, user);
          }
        }
      } catch (error) {
        console.log("Error in google strategy-passport", error);
        return;
      }
    }
  )
);

module.exports = passport;
