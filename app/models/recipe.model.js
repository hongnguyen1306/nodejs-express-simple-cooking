const sql = require("./db.js");

const Recipe = function (recipe) {
  this.cuisine_id = recipe.cuisine_id;
  this.name = recipe.name;
  this.description = recipe.description;
  this.img = recipe.img;
};

Recipe.findById = (id, result) => {
  sql.query(`SELECT * FROM recipes WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Recipe.getAll = (title, result) => {
  let query = `SELECT recipes.*, cuisines.cuisine_name  FROM recipes JOIN cuisines ON recipes.cuisine_id = cuisines.id `;

  if (title) {
    query += ` WHERE name LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Recipe.getRecipeByCuisine = (value, result) => {
  sql.query(
    `SELECT recipes.*
     FROM recipes
     JOIN cuisines ON recipes.cuisine_id = cuisines.id
     WHERE cuisines.cuisine_name LIKE '%${value}%'
     GROUP BY recipes.id`,
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

Recipe.getRecipesByKey = async (ids) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM recipes WHERE id IN (${ids})`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

Recipe.getRecipesByIngredient = (value, result) => {
  sql.query(
    `SELECT recipes.*
     FROM recipes
     JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id
     JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id
     WHERE ingredients.ingredient_name LIKE '%${value}%'
     GROUP BY recipes.id`,
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

module.exports = Recipe;
