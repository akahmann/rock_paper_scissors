const express = require("express");

var dbName = "postgres://xyvynfzkbbhyte:1fa921bcd8c58b9b2c9fdbdb341f48718df4fb4f8d8c97534b643942ad66bb7e@ec2-54-83-8-246.compute-1.amazonaws.com:5432/d5hn9ej1pf6kn"

const app = express();
const port = process.env.PORT || 5000;
const dbConnectionString = process.env.DATABASE_URL || dbName;

app.get("/person", getPerson);

app.listen(port, function() {
   console.log("Server is listening on port " + port);
});

function getPerson(req, res) {
   console.log("Getting person...");

   //get the id from the req...
   console.log("Trying to connect to a db at: " + dbConnectionString);

   res.json({name: "john"});
}