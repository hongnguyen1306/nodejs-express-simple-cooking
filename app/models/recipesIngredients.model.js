const sql = require("./db.js");

// constructor
const RecipeIngredient = function (recipeIngredient) {
  this.recipe_id = recipeIngredient.recipe_id;
  this.unit_id = recipeIngredient.unit_id;
  this.ingredient_id = recipeIngredient.ingredient_id;
  this.amount = recipeIngredient.amount;
};

RecipeIngredient.findByIngredient = (ingredient_id, result) => {
  sql.query(
    `SELECT DISTINCT recipe_id FROM recipe_ingredients WHERE ingredient_id = ${ingredient_id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

RecipeIngredient.getAllByRecipe = (recipe_id, result) => {
  sql.query(
    `SELECT recipe_id, ingredient_id, detail FROM recipe_ingredients WHERE recipe_id = ${recipe_id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

RecipeIngredient.getStepsByRecipe = async (ids) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT detail FROM recipe_ingredients WHERE recipe_id  = ${ids}`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

module.exports = RecipeIngredient;
