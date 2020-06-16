// Requiring necessary npm middleware packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
// Setting up port
var PORT = process.env.PORT || 8080;
// Import the models folder
var db = require("./models");
// Creating express app and configuring middleware
//needed to read through our public folder
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
//
// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
//
//we are doing a GET to test if our server is working fine
app.get("/", function (req, res) {
  res.send("Welcome to Passport with Sequelize and without HandleBars");
});
//
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
