const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");

// link the database
const db = require("./config/mongoose");

// Setup the layout
app.use(expressLayouts);

// Set Scripts of component to layout specific pos
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// use express router
app.use("/", require("./routes"));

// Define folder for static files
app.use(express.static("./assets")); // look for static files inside assets folder

// Set up views engine
app.set("view engine", "ejs");
app.set("views", "./views"); // look for

//Start the app on the prot
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in running the server: ${error}`);
  }
  console.log(`Server is running on port: ${port}`);
});
