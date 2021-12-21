const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    port: '3306',
    user: "root",
    password: "rootroot",
    database: "capstone_database"
  });

con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
con.query("CREATE DATABASE capstone_database", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});
});