const recipes = require("../controllers/recipe.controller.js");

var router = require("express").Router();

// Retrieve all Recipes
router.get("/", recipes.findAll);

// Retrieve all published Recipes
router.get("/cuisine/:cuisine_id", recipes.findAllByCuisine);

// Retrieve a single Recipe with id
router.get("/:id", recipes.findOne);

module.exports = router;
