const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const logger = require("morgan");
// console.log(process.env);
const cookieParser = require("cookie-parser");
const app = express();
require("./config/view-helpers")(app);

const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");

const env = require("./config/environment");
const path = require("path");

// link the database
const db = require("./config/mongoose");

//Authentication libraries
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

// Mongo-store
const MongoStore = require("connect-mongo");

//SASS
//FIXME: ToDo figure out how to use sass in the project?
const sass = require("sass");

//Display Flash msg
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const { log } = require("console");

//Setup socketIO
const chatServer = require("http").createServer(app);
const chatSocket = require("./config/chat_socket").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat Server is listening on port 5000");

// Make the uploads path available to browser
app.use("/uploads", express.static(__dirname + "/uploads"));

// Used to get the body in the req
app.use(express.urlencoded({ extended: true }));

// Used to use the cookies or parse
app.use(cookieParser());

// Setup the layout
app.use(expressLayouts);

// Set Scripts of component to layout specific pos
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Define folder for static files
app.use(express.static(env.asset_path)); // look for static files inside assets folder

// Set up views engine
app.set("view engine", "ejs");
app.set("views", "./views"); // look for

//Authentication part
// Mongo Store is used to store the session cookie
app.use(
  session({
    name: "codial",
    // ToDo change the secret before deployment
    secret: env.session_cookie_key,
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

app.use(flash());
app.use(customMware.setFlash);
app.use(logger(env.morgan.mode, env.morgan.options));

// use express router
app.use("/", require("./routes"));

//Start the app on the prot
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in running the server: ${error}`);
  }
  console.log(`Server is running on port: ${port}`);
});
