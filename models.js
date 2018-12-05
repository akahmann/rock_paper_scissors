const { Pool } = require("pg");

var dbName = "postgres://xyvynfzkbbhyte:1fa921bcd8c58b9b2c9fdbdb341f48718df4fb4f8d8c97534b643942ad66bb7e@ec2-54-83-8-246.compute-1.amazonaws.com:5432/d5hn9ej1pf6kn";
//var dbName = process.env.DATABASE_URL || "postgres://pbjuser:rosebud@localhost:5432/pbjgame";
const dbConnectionString = process.env.DATABASE_URL || dbName;

const pool = new Pool({connectionString: dbConnectionString});

/********************************************************************
* Add a user account to the database.
********************************************************************/
function addUserToDb(username, password, callback) {

   var sql = "INSERT INTO users (username, password, wins, losses) "
           + "VALUES ($1::varchar, $2::varchar, 0, 0)";

   var params = [username, password];

   pool.query(sql, params, function(err, result) {

      if (err) {
         console.log("Error in query: ");
         console.log(err);
         callback(err, null);
      }

      console.log("Adding to the database: " + username);

      callback(null, {success: true});

   });
}

/********************************************************************
* Add a friend connection to the database.
********************************************************************/
function addFriendToDb(user_id, id, callback) {

   var sql = "INSERT INTO friends (user_id, friend_id) "
           + "VALUES ($1::int, $2::int), ($2::int, $1::int)";

   var params = [user_id, id];

   pool.query(sql, params, function(err, result) {

      if (err) {
         console.log("Error in query: ");
         console.log(err);
         callback(err, null);
      }

      console.log("Adding to the database: " + user_id + " with " + id);

      callback(null, {success: true});

   });
}

/********************************************************************
* Display all friends of a user from the database.
********************************************************************/
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
   addUserToDb: addUserToDb,
   addFriendToDb: addFriendToDb,
   getFriendsFromDb: getFriendsFromDb,
   getUserFromDb: getUserFromDb
};