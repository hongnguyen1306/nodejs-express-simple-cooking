const sql = require("./db.js");

// constructor
const RecipeIngredient = function (recipeIngredient) {
  this.recipe_id = recipeIngredient.recipe_id;
  this.unit_id = recipeIngredient.unit_id;
  this.ingredient_id = recipeIngredient.ingredient_id;
  this.amount = recipeIngredient.amount;
};

RecipeIngredient.create = (newRecipeIngredient, result) => {
  sql.query(
    "INSERT INTO recipe_ingredients SET ?",
    newRecipeIngredient,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created a new recipe's ingredient: ", {
        id: res.insertId,
        ...newRecipeIngredient,
      });
      result(null, { id: res.insertId, ...newRecipeIngredient });
    }
  );
};

RecipeIngredient.findByIngredient = (id, result) => {
  sql.query(`SELECT * FROM recipe_ingredients WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found recipeIngredient: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found RecipeIngredient with the id
    result({ kind: "not_found" }, null);
  });
};

RecipeIngredient.getAllByRecipe = (recipe_id, result) => {
  sql.query(
    `SELECT * FROM recipe_ingredients WHERE recipe_id = ${recipe_id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("recipe_ingredients: ", res);
      result(null, res);
    }
  );
};

RecipeIngredient.remove = (id, result) => {
  sql.query("DELETE FROM recipe_ingredients WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found RecipeIngredient with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted recipeIngredient with id: ", id);
    result(null, res);
  });
};

RecipeIngredient.removeAll = (result) => {
  sql.query("DELETE FROM recipe_ingredients", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} recipe_ingredients`);
    result(null, res);
  });
};

module.exports = RecipeIngredient;
