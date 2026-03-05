require('dotenv').config();  // dotenv import કરો

const mysql = require("mysql2");

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // .env માંથી load
  user: process.env.DB_USER,       // .env માંથી load
  password: process.env.DB_PASS,   // .env માંથી load
  database: process.env.DB_NAME    // .env માંથી load
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Error:", err);
  } else {
    console.log("MySQL Connected!");
  }
});

module.exports = db;
