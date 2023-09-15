const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const env = require("./environment");

const crypto = require("crypto");
const User = require("../models/user");

// Tell passport to use new strategy for google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_callback_url,
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
