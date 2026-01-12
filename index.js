// Importing express
const express = require("express");

// Importing cors
const cors = require("cors");

// dotenv
require("dotenv").config();

//port
const port = process.env.PORT;

// Import mysql
const mysql = require("mysql2");

// App init
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Logger middleware (same as yours)
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${req.ip}`);
  next();
};
app.use(logger);

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "testDB"
});

// Connect MySQL
db.connect((err) => {
  if (err) {
    console.log("MySQL connection failed");
    return;
  }
  console.log("MySQL connected ✅");
});


// ================= ROUTES =================

// ROOT
app.get("/", (req, res) => {
  res.send("The Server is Working (MySQL)");
});


// SERVER
app.listen(5000, () => {
  console.log(`The Server is Running on ${port} Port`);
});