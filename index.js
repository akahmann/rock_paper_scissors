const express = require("express");
const port = process.env.PORT || 5000;

const path = require("path");
const controllers = require("./controllers.js");

express()
   .use(express.json()) // supports JSON encoded bodies
   .use(express.urlencoded({extended: true})) // supports url-encoded bodies
   .use(express.static(path.join(__dirname, "public")))
   .post("/createUser/:id/:username/:password", controllers.createUser)
   .post("/addFriend/:user_id/:id", controllers.addFriend)
   .get("/displayFriends/:id", controllers.displayFriends)
   .get("/getUser/:id", controllers.getUser)
   .listen(port, function() {
      console.log("Server listening on port " + port)
   });