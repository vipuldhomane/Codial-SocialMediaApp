const passport = require("passport");

const LocalStrategy = require("passport-local");

// import the database
const User = require("../models/user");

// create local strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async function (req, email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        req.flash("error", "Error in finding user");
        return done(error);
      }
    }
  )
);

// Serialize user to store in session // passing the user to the req
passport.serializeUser(function (user, done) {
  // console.log(user.id);
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

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if user is signed in call the next function
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the sessions and we are just sending this to the locals for the views
    res.locals.user = res.user;
  }
  // call the next fun
  return next();
};

module.exports = passport;
