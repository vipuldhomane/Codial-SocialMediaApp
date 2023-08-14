const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");

// link the database
const db = require("./config/mongoose");

//Authentication libraries
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// Mongo-store
const MongoStore = require("connect-mongo");

//SASS
//ToDo figure out how to use sass in the project?
const sass = require("node-sass"); // not used in this project yet // Rewise this

// Used to get the body
app.use(express.urlencoded({ extended: true }));

// Used to use the cookies or parse
app.use(cookieParser());

// Setup the layout
app.use(expressLayouts);

// Set Scripts of component to layout specific pos
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Define folder for static files
app.use(express.static("./assets")); // look for static files inside assets folder

// Set up views engine
app.set("view engine", "ejs");
app.set("views", "./views"); // look for

//Authentication part
// Mongo Store is used to store the session cookie
app.use(
  session({
    name: "codial",
    // ToDo change the secret before deployment
    secret: "Blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore({
      mongoUrl: "mongodb://localhost/codial_development", // MongoDB connection URL
      autoRemove: "disabled",
    }),
  })
);

// Initialize the passport js
app.use(passport.initialize());
app.use(passport.session());

//set the cookie to local storage
app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));

//Start the app on the prot
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in running the server: ${error}`);
  }
  console.log(`Server is running on port: ${port}`);
});
