const { Pool } = require("pg");

var dbName = "postgres://xyvynfzkbbhyte:1fa921bcd8c58b9b2c9fdbdb341f48718df4fb4f8d8c97534b643942ad66bb7e@ec2-54-83-8-246.compute-1.amazonaws.com:5432/d5hn9ej1pf6kn";
//var dbName = process.env.DATABASE_URL || "postgres://pbjuser:rosebud@localhost:5432/pbjgame";
const dbConnectionString = process.env.DATABASE_URL || dbName;

const pool = new Pool({connectionString: dbConnectionString});

/********************************************************************
* Find username and password for login
********************************************************************/
function checkUserLogin(username, password, callback) {
   console.log("Finding person from DB with username: " + username + " and password: " + password);

   var sql = "SELECT id FROM users WHERE username = $1::varchar AND password = $2::varchar";

   var params = [username, password];

   pool.query(sql, params, function(err, result) {

      if (err) {
         console.log("Error in query: ");
         console.log(err);
         callback(err, null);
      }

      //console.log("Found result: " + JSON.stringify(result.rows));
      if (result.rows.length == 1)
         callback(null, {success: true, id: result.rows[0].id});
      else {
         callback(null, {success: false});
      }
   });
}

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
      else {
         callback(null, {success: true});
      }
   });
}

/********************************************************************
* Add a friend connection to the database.
********************************************************************/
function addFriendToDb(user_id, id, callback) {

   console.log("INSERT new friend connection");

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
* Add a game to the database.
********************************************************************/
function addGameToDb(player1_id, player2_id, callback) {

   console.log("INSERT new game connection");

   var sql = "INSERT INTO games (player1_id, player2_id, option1, option2) "
           + "VALUES ($1::int, $2::int, 'n', 'n')";

   var params = [player1_id, player2_id];

   pool.query(sql, params, function(err, result) {

      if (err) {
         console.log("Error in query: ");
         console.log(err);
         callback(err, null);
      }

      callback(null, {success: true});

   });
}

/********************************************************************
* Update option1 to database
********************************************************************/
function updateOption1ToDb(game_id, option1, callback) {

   console.log("UPDATE option1");

   var sql = "UPDATE games SET option1 = $2::char WHERE id = $1::int";

   var params = [game_id, option1];

   pool.query(sql, params, function(err, result) {

      if (err) {
         console.log("Error in query: ");
         console.log(err);
         callback(err, null);
      }

      callback(null, {success: true});

   });
}

/********************************************************************
* Update option2 to database
********************************************************************/
function updateOption2ToDb(game_id, option2, callback) {

   console.log("UPDATE option2");

   var sql = "UPDATE games SET option2 = $2::char WHERE id = $1::int";

   var params = [game_id, option2];

   pool.query(sql, params, function(err, result) {

      if (err) {
         console.log("Error in query: ");
         console.log(err);
         callback(err, null);
      }

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
* Display all games of a user from the database.
********************************************************************/
function getGamesFromDb(id, callback) {

   console.log("Getting all friends from DB from user with id: " + id);

   var sql = "";
   sql += "SELECT g.id AS game_id, u.id, u.username, g.player1_id, g.player2_id, g.option1, g.option2"
       + " FROM users u JOIN games g ON (g.player1_id = u.id OR g.player2_id = u.id)"
       + " WHERE (g.player1_id = $1::int OR g.player2_id = $1::int)"
       + " AND (option1 != 'n' AND option2 != 'n')";

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

/********************************************************************
* Find a user with username from database to find id.
********************************************************************/
function getUserByNameFromDb(username, callback) {
   console.log("In the FUNCTION");
   console.log("Getting friend from DB with username: " + username);

   var sql = "SELECT id FROM users WHERE username = $1::varchar";

   var params = [username];

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
* Find game from database to update it.
********************************************************************/
function getGameFromDb(id, callback) {

   var sql = "SELECT id, player1_id, player2_id, option1, option2 FROM games WHERE id = $1::int";

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
   checkUserLogin : checkUserLogin,
   addUserToDb : addUserToDb,
   addFriendToDb : addFriendToDb,
   addGameToDb : addGameToDb,
   updateOption1ToDb : updateOption1ToDb,
   updateOption2ToDb : updateOption2ToDb,
   getFriendsFromDb : getFriendsFromDb,
   getGamesFromDb : getGamesFromDb,
   getUserFromDb : getUserFromDb,
   getUserByNameFromDb : getUserByNameFromDb,
   getGameFromDb : getGameFromDb
};