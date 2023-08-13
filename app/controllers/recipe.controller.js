const Recipe = require("../models/recipe.model.js");

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
  Recipe.findById(req.params.id, (err, data) => {
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
    } else res.send(data);
  });
};

// find all cuisine_id recipes
exports.findAllByCuisine = (req, res) => {
  Recipe.getAllByCuisine((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    else res.send(data);
  });
};

// Update a Recipe identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Recipe.updateById(req.params.id, new Recipe(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Recipe with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Recipe with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  Recipe.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Recipe with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Recipe with id " + req.params.id,
        });
      }
    } else res.send({ message: `Recipe was deleted successfully!` });
  });
};

// Delete all recipes from the database.
exports.deleteAll = (req, res) => {
  Recipe.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recipes.",
      });
    else res.send({ message: `All recipes were deleted successfully!` });
  });
};
