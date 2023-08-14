const recipes = require("../controllers/recipe.controller.js");

var router = require("express").Router();

// Retrieve all Recipes
router.get("/", recipes.findAll);

// Retrieve all Recipes by cuisine
router.get("/cuisine/:key", recipes.findAllByCuisine);

// Retrieve all Recipes by ingredient
router.get("/ingredient/:key", recipes.findAllByIngredient);

// Retrieve a recipe with id
router.get("/:id", recipes.findOne);

module.exports = router;
