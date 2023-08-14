const RecipesIngredient = require("../models/recipesIngredients.model.js");
const Recipe = require("../models/recipe.model.js");
const Cuisine = require("../models/cuisine.mode.js");
const Ingredient = require("../models/ingredient.model.js");

// Create and Save a new Recipe
exports.create = (req, res) => {
  console.log("req.body ", req.body);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Recipe
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    cuisine_id: req.body.cuisine_id,
    img: req.body.img,
  });

  // Save Recipe in the database
  Recipe.create(recipe, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recipe.",
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Recipe.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    else res.send(data);
  });
};

// Find a single Recipe by Id
exports.findOne = (req, res) => {
  Recipe.findById(req.params.id, async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Recipe with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Recipe with id " + req.params.id,
        });
      }
    } else {
      console.log(data);
      const data2 = JSON.parse(JSON.stringify(data));
      const testData = await RecipesIngredient.getStepsByRecipe(data2.id);
      const data3 = JSON.parse(JSON.stringify(testData));
      data2.steps = data3;
      res.send(data2);
    }
  });
};

// find all by cuisine
exports.findAllByCuisine = (req, res) => {
  const key = req.params.key;

  Recipe.getRecipeByCuisine(key, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    else res.send(data);
  });
};

// find all by ingredient
exports.findAllByIngredient = (req, res) => {
  const key = req.params.key;
  console.log("key ", key);

  Recipe.getRecipesByIngredient(key, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    else res.send(data);
  });
};
