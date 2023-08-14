require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB_DATABASE_NAME,
};
