const recipesIngredient = require("../controllers/recipeIngredient.controller.js");

var router = require("express").Router();

// Retrieve a single Recipe with id
router.get("/recipe/:recipe_id", recipesIngredient.findAllByRecipe);

// Retrieve a single Recipe with Ingredient id
router.get("/ingredient/:ingredient_id", recipesIngredient.findAllByIngredient);

module.exports = router;
