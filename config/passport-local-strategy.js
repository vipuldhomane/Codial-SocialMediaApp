const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../models/user");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        console.log("Invalid Username/Password");
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.log("Error in finding user --> Passport");
      return done(error);
    }
  })
);

// Serialize user to store in session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
