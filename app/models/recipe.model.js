const sql = require("./db.js");

// constructor
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
      console.log("found recipe: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Recipe with the id
    result({ kind: "not_found" }, null);
  });
};

Recipe.getAll = (title, result) => {
  let query = "SELECT * FROM recipes";

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

Recipe.getAllByCuisine = (cuisine_id, result) => {
  sql.query(
    `SELECT * FROM recipes WHERE cuisine_id = ${cuisine_id}`,
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

module.exports = Recipe;
