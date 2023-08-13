const sql = require("./db.js");

// constructor
const Recipe = function (recipe) {
  this.cuisine_id = recipe.cuisine_id;
  this.name = recipe.name;
  this.description = recipe.description;
  this.img = recipe.img;
};

Recipe.create = (newRecipes, result) => {
  sql.query("INSERT INTO recipes SET ?", newRecipes, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created recipe: ", { id: res.insertId, ...newRecipes });
    result(null, { id: res.insertId, ...newRecipes });
  });
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

    console.log("recipes: ", res);
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

      console.log("recipes: ", res);
      result(null, res);
    }
  );
};

Recipe.updateById = (id, recipe, result) => {
  sql.query(
    "UPDATE recipes SET name = ?, description = ?, cuisine_id = ?, img = ? WHERE id = ?",
    [recipe.name, recipe.description, recipe.cuisine_id, recipe.img, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Recipe with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated recipe: ", { id: id, ...recipe });
      result(null, { id: id, ...recipe });
    }
  );
};

Recipe.remove = (id, result) => {
  sql.query("DELETE FROM recipes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Recipe with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted recipe with id: ", id);
    result(null, res);
  });
};

Recipe.removeAll = (result) => {
  sql.query("DELETE FROM recipes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} recipes`);
    result(null, res);
  });
};

module.exports = Recipe;
