const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const dbConnectionString = process.env.DATABASE_URL || "something";

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