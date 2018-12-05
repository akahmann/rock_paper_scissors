const models = require("./models.js");

/********************************************************************
* Add a user account to the database.
********************************************************************/
function createUser(req, res) {
   console.log("Creating user");

   var username = req.params.username;
   var password = req.params.password;

   models.addUserToDb(username, password, function(error, result) {
      console.log("Back from the database with result: " + result);
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result);
      }
   });
}

/********************************************************************
* Add a friend connection to the database.
********************************************************************/
function addFriend(req, res) {
   console.log("Adding friend");

   var user_id = req.params.user_id;
   var id = req.params.id;

   models.addFriendToDb(user_id, id, function(error, result) {
      console.log("Back from the database with result: ", result);
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result);
      }
   });
}

/********************************************************************
* Display all friends of a user from the database.
********************************************************************/
function displayFriends(req, res) {
   console.log("Displaying all friends");

   var id = req.params.id;

   models.getFriendsFromDb(id, function(error, result) {
      console.log("Back from the database with result: " + result);
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result);
      }
   });
}

/********************************************************************
* Add a friend connection to the database.
********************************************************************/
function getUser(req, res) {
   console.log("Getting a user");

   var id = req.params.id;

   models.getUserFromDb(id, function(error, result) {
      console.log("Back from the database with result:", result);
      if (error || result == null || result.length != 1) {
         res.status(500).json({success: false, data: error});
      }
      else {
         var username = result[0];
         res.status(200).json(result[0]);
      }
   });
}

module.exports = {
   createUser: createUser,
   addFriend: addFriend,
   displayFriends: displayFriends,
   getUser: getUser
};