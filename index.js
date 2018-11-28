const express = require("express");
const port = process.env.PORT || 5000;

const path = require("path");

const controllers = require("./controllers.js")

express()
   .use(express.json()) // supports JSON encoded bodies
   .use(express.urlencoded({extended: true})) // supports url-encoded bodies
   .use(express.static(path.join(__dirname, "public")))
   .post("/createUser", controllers.createUser)
   .post("/addFriend", controllers.addFriend)
   .get("/displayFriends/:id", controllers.displayFriends)
   .get("/getUser/:id", controllers.getUser)
   .listen(port, function() {
      console.log("Server listening on port " + port)
   });

// var app = express();

// const { Pool } = require("pg");

// var dbName = "postgres://xyvynfzkbbhyte:1fa921bcd8c58b9b2c9fdbdb341f48718df4fb4f8d8c97534b643942ad66bb7e@ec2-54-83-8-246.compute-1.amazonaws.com:5432/d5hn9ej1pf6kn"
// const dbConnectionString = process.env.DATABASE_URL || dbName;

// const pool = new Pool({dbConnectionString: dbConnectionString});


// app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname + '/public'));


// app.get('/getUser', function(request, response) {
//    getUser(request, response);
// });


// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });


// function getUser(request, response) {
//    var id = request.query.id;

//    getUserFromDb(id, function(error, result) {

//       if (error || result == null || result.length != 1) {
//          response.status(500).json({success: false, data: error});
//       } else {
//          var person = result[0];
//          response.status(200).json(result[0]);
//       }
//    });
// }

// function getUserFromDb(id, callback) {
//    console.log("Getting user from DB with id: " + id);

//    var sql = "SELECT id, username FROM person WHERE id = $1::int";

//    var params = [id];

//    pool.query(sql, params, function(err, result) {
//       if (err) {
//          console.log("Error in query: ")
//          console.log(err);
//          callback(err, null);
//       }

//       console.log("Found result: " + JSON.stringify(result.rows));

//       callback(null, result.rows);
//    });

// }