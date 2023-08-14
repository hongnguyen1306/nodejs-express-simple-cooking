var express = require("express");
const cors = require("cors");
var bodyparser = require("body-parser");

var recipeRouter = require("./app/routes/recipe.routes");
var recipeIngredientRouter = require("./app/routes/recipeIngredient.routes");

var app = express();

require("dotenv").config();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to cooking recipe application." });
});

app.use("/api/recipes", recipeRouter);
app.use("/api/recipesIngredients", recipeIngredientRouter);

const PORT = process.env.PORT || 5500;

var server = app.listen(PORT, function () {
  console.log("Server listening on port " + server.address().port);
});

module.exports = app;
