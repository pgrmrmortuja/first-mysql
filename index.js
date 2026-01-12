
const express = require("express") // Importing express
const cors = require("cors"); // Importing cors
require("dotenv").config(); // dotenv
const port = process.env.PORT; //port
const mysql = require("mysql2"); // Import mysql

// App init
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Logger middleware 
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${req.ip}`);
    next();
};
app.use(logger);

// MySQL connection
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
    console.log("MySQL connected");
});


// ================= ROUTES =================

// ROOT
app.get("/", (req, res) => {
    res.send("The MySQL Server is Working.");
});


// POST data (MongoDB: insertOne)
app.post("/add-data", (req, res) => {
    const data = req.body;
    const sql = "INSERT INTO students SET ?";
    db.query(sql, data, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
})


// GET all data (MongoDB: find())
app.get("/get-data", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
})


// SERVER
app.listen(port, () => {
    console.log(`The Server is Running on ${port} Port`);
});