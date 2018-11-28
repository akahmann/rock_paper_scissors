const { Pool } = require("pg");

var dbName = "postgres://xyvynfzkbbhyte:1fa921bcd8c58b9b2c9fdbdb341f48718df4fb4f8d8c97534b643942ad66bb7e@ec2-54-83-8-246.compute-1.amazonaws.com:5432/d5hn9ej1pf6kn"
const dbConnectionString = process.env.DATABASE_URL || dbName;
//const dbConnectionString = process.env.DATABASE_URL || dbName;
console.log("DB string: " + dbConnectionString);

const pool = new Pool({dbConnectionString: dbConnectionString});

function createUser(req, res) {
   console.log("Creating user");

   console.log("Wanting to create: " + req.body.username);

   var result = {status:"success",
      entity: {id: 99, username: "MONSTER"}
   };

   res.json(result);
}

function addFriend(req, res) {
   console.log("Adding friend");

   console.log("Wanting to add as friend: " + req.body.username);

   var result = {status:"success",
      entity: {id: 99, username: "MONSTER"}
   };

   res.json(result);
}

function displayFriends(req, res) {
   console.log("Displaying all friends");

   var id = req.params.id;
   var username = "Bob";

   var result = {id: id, username: username};

   res.json(result);

   //    Here we will do a sql query in order to find
   //    all friends linked with this user
}

function getUser(req, res) {
   console.log("Getting a user");

   var id = req.params.id;

   // var sql = "SELECT id, username FROM users WHERE id = $1::int";

   // var params = [id];

   getUserFromDb(id, function(error, result) {
      console.log("Back from the database with result:", result);
      if (error || result == null || result.length != 1) {
         res.status(500).json({success: false, data: error});
      }
      else {
         var username = result[0];
         res.status(200).json(result[0]);
      }
   })
}

function getUserFromDb(id, callback) {
   console.log("Getting person from DB with id: " + id);

   var sql = "SELECT id, username FROM users WHERE id = $1::int";

   var params = [id];

   pool.query(sql, params, function(err, result) {
      if (err) {
         console.log("Error in query: ")
         console.log(err);
         callback(err, null);
      }

      console.log("Found result: " + JSON.stringify(result.rows));

      callback(null, result.rows);
   });
}

module.exports = {
   createUser: createUser,
   addFriend: addFriend,
   displayFriends: displayFriends,
   getUser: getUser
};