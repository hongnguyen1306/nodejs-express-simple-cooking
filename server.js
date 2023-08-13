var express = require("express");
var bodyparser = require("body-parser");

var recipeRouter = require("./app/routes/recipe.routes");
var recipeIngredientRouter = require("./app/routes/recipeIngredient.routes");

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to cooking recipe application." });
});

app.use("/api/recipes", recipeRouter);
app.use("/api/recipesIngredients", recipeIngredientRouter);

var server = app.listen(3000, function () {
  console.log("Server listening on port " + server.address().port);
});
module.exports = app;
