const express = require("express");
const session = require("express-session");
const port = process.env.PORT || 5000;

const path = require("path");
const controllers = require("./controllers.js");

express()
   .use(session({
      secret: 'its-a-secret-to-everbody',
      resave: false,
      saveUninitialized: true
   }))
   .use(express.json()) // supports JSON encoded bodies
   .use(express.urlencoded({extended: true})) // supports url-encoded bodies
   .use(express.static(path.join(__dirname, "/public")))
   .post("/login/:username/:password", controllers.login)
   .post("/logout", controllers.logout)
   .post("/createUser/:username/:password", controllers.createUser)
   .post("/addFriend/:id", controllers.addFriend)
   .post("/createGame/:id", controllers.createGame)
   .post("/pickOption1/:game_id/:option1", controllers.pickOption1)
   .post("/pickOption2/:game_id/:option2", controllers.pickOption2)
   .get("/isLoggedIn", controllers.isLoggedIn)
   .get("/displayFriends", controllers.displayFriends)
   .get("/displayGames", controllers.displayGames)
   .get("/getUser/:username", controllers.getUser)
   .get("/getGame/:game_id", controllers.getGame)
   .listen(port, function() {
      console.log("Server listening on port " + port)
   });