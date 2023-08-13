var express = require("express");
var bodyparser = require("body-parser");

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to cooking recipe application." });
});

require("./app/routes/recipe.routes.js")(app);

var server = app.listen(3000, function () {
  console.log("Server listening on port " + server.address().port);
});
module.exports = app;
