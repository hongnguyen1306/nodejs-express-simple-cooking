const RecipesIngredient = require("../models/recipesIngredients.model.js");
const Recipe = require("../models/recipe.model.js");

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  RecipesIngredient.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    else res.send(data);
  });
};

// find all recipes
exports.findAllByRecipe = (req, res) => {
  console.log(" req.params ", req.params);
  const recipe_id = req.params.recipe_id;

  RecipesIngredient.getAllByRecipe(recipe_id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    else res.send(data);
  });
};

// find all Ingredient recipes
exports.findAllByIngredient = (req, res) => {
  const ingredient_id = req.params.ingredient_id;

  RecipesIngredient.findByIngredient(ingredient_id, async (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    else {
      const data2 = JSON.parse(JSON.stringify(data));
      const recipeIds = data2.map((item) => item.recipe_id);
      const ids = recipeIds.join(",");
      const testData = await Recipe.getRecipesByKey(ids);
      res.send(testData);
    }
  });
};
