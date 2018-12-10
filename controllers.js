const models = require("./models.js");

/********************************************************************
* Login in the user.
********************************************************************/
function login(req, res) {

   var result = {success: false};

   var username = req.params.username;
   var password = req.params.password;

   models.checkUserLogin(username, password, function(error, result) {
      console.log("Back from the database with result: " + result);
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         if (result.success == true) {
            req.session.current_id = result.id;
         }
         res.status(200).json(result);
      }
   })
}

/********************************************************************
* Logout in the user.
********************************************************************/
function logout(req, res) {

   var result = {success: false};

   console.log(req.session.current_id);

   if (req.session.current_id) {
      req.session.destroy();
      result = {success: true};
   }

   res.json(result);

}

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

   var id = req.session.current_id;

   console.log("This is session id: ");
   console.log(req.session.current_id);

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
   login : login,
   logout : logout,
   createUser: createUser,
   addFriend: addFriend,
   displayFriends: displayFriends,
   getUser: getUser
};