const { Pool } = require("pg");

//var dbName = "postgres://xyvynfzkbbhyte:1fa921bcd8c58b9b2c9fdbdb341f48718df4fb4f8d8c97534b643942ad66bb7e@ec2-54-83-8-246.compute-1.amazonaws.com:5432/d5hn9ej1pf6kn";
const dbConnectionString = process.env.DATABASE_URL || "postgres://pbjuser:rosebud@localhost:5432/pbjgame";
const dbConnectionString = process.env.DATABASE_URL || dbName;

const pool = new Pool({connectionString: dbConnectionString});

/********************************************************************
* Add a user account to the database.
********************************************************************/
function createUser(req, res) {
   console.log("Creating user");

   var id = req.params.id;
   var username = req.params.username;
   var password = req.params.password;

   addUserToDb(id, username, password, function(error, result) {
      console.log("Back from the database with result: ", result);
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result);
      }
   })

   res.json(result);
}

function addUserToDb(id, username, password, callback) {
   console.log("Adding to the database: " + username);

   var sql = "INSERT INTO users (id, username, password) "
           + "VALUES ($1::int, $2::string, $3::string)";

   var params = [user_id, id];

   pool.query(sql, params, function(err, result) {
      if (err) {
         console.log("Adding to the database: " + username);
         console.log(err);
         callback(err, null);
      }

      console.log("Found result: " + JSON.stringify(result.rows));

      callback(null, result.rows);
   });
}

/********************************************************************
* Add a friend connection to the database.
********************************************************************/
function addFriend(req, res) {
   console.log("Adding friend");

   var user_id = req.params.user_id;
   var id = req.params.id;

   addFriendToDb(user_id, id, function(error, result) {
      console.log("Back from the database with result: ", result);
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result);
      }
   })

   res.json(result);
}

function addFriendToDb(user_id, id, callback) {
   console.log("Adding to the database: " + user_id + " with " + id);

   var sql = "INSERT INTO friends (user_id, friend_id) "
           + "VALUES ($1::int, $2::int), ($2::int, $1::int)";

   var params = [user_id, id];

   pool.query(sql, params, function(err, result) {
      if (err) {
         console.log("Error in query: ");
         console.log(err);
         callback(err, null);
      }

      console.log("Found result: " + JSON.stringify(result.rows));

      callback(null, result.rows);
   });
}

/********************************************************************
* Display all friends of a user from the database.
********************************************************************/
function displayFriends(req, res) {
   console.log("Displaying all friends");

   var id = req.params.id;

   getFriendsFromDb(id, function(error, result) {
      console.log("Back from the database with result:", result);
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result);
      }
   })
}

function getFriendsFromDb(id, callback) {
   console.log("Getting all friends from DB from user with id: " + id);

   var sql = "SELECT u.id, username FROM users u JOIN friends f ON f.friend_id = u.id WHERE f.user_id = $1::int";

   var params = [id];

   pool.query(sql, params, function(err, result) {
      if (err) {
         console.log("Error in query: ");
         console.log(err);
         callback(err, null);
      }

      console.log("Found result: " + JSON.stringify(result.rows));

      callback(null, result.rows);
   });
}

/********************************************************************
* Add a friend connection to the database.
********************************************************************/
function getUser(req, res) {
   console.log("Getting a user");

   var id = req.params.id;

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
         console.log("Error in query: ");
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