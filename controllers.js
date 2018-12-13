const models = require("./models.js");

/********************************************************************
* Login in the user.
********************************************************************/
function login(req, res) {

   var result = {success: false};

   var username = req.params.username;
   var password = req.params.password;

   models.checkUserLogin(username, password, function(error, result) {
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
* Logout in the user.
********************************************************************/
function isLoggedIn(req, res) {

   var id = 0;

   console.log("SESSION VARIABLE IS: " + req.session.current_id);

   if (req.session.current_id) {
      id = req.session.current_id;
   }

   models.getUserFromDb(id, function(error, result) {
      if (error || result == null || result.length != 1) {
         res.status(500).json({success: false, data: error});
      }
      else {
         var username = result[0];
         res.status(200).json(result[0]);
      }
   });
}

/********************************************************************
* Add a user account to the database.
********************************************************************/
function createUser(req, res) {

   var username = req.params.username;
   var password = req.params.password;

   models.addUserToDb(username, password, function(error, result) {
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

   console.log("Add friend");

   var user_id = req.session.current_id;
   console.log("This is user_id: " + user_id);
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
* Create a game between two users.
********************************************************************/
function createGame(req, res) {

   console.log("Add friend");

   var player1_id = req.session.current_id;
   var player2_id = req.params.id;

   models.addGameToDb(player1_id, player2_id, function(error, result) {
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result);
      }
   });
}

/********************************************************************
* Player1 picks for option1
********************************************************************/
function pickOption1(req, res) {

   console.log("Picking For Option1");

   var game_id = req.params.game_id;
   var option1 = req.params.option1;

   models.updateOption1ToDb(game_id, option1, function(error, result) {
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result);
      }
   });
}

/********************************************************************
* Player2 picks for option2
********************************************************************/
function pickOption2(req, res) {

   console.log("Picking For Option2");

   var game_id = req.params.game_id;
   var option2 = req.params.option2;

   models.updateOption2ToDb(game_id, option2, function(error, result) {
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

   var id = req.session.current_id;

   models.getFriendsFromDb(id, function(error, result) {
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result);
      }
   });
}

/********************************************************************
* Display all games of a user from the database.
********************************************************************/
function displayGames(req, res) {

   var id = req.session.current_id;

   models.getGamesFromDb(id, function(error, result) {
      if (error || result == null) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result);
      }
   });
}

/********************************************************************
* Find a user from the database
********************************************************************/
function getUser(req, res) {

   var username = req.params.username;

   console.log("START");

   models.getUserByNameFromDb(username, function(error, result) {
      if (error || result == null || result.length != 1) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result[0]);
      }
   });
}

/********************************************************************
* Find a game from the database
********************************************************************/
function getGame(req, res) {

   var id = req.params.game_id;

   console.log("Getting game from DB");

   models.getGameFromDb(id, function(error, result) {
      if (error || result == null || result.length != 1) {
         res.status(500).json({success: false, data: error});
      }
      else {
         res.status(200).json(result[0]);
      }
   });
}

module.exports = {
   login : login,
   logout : logout,
   isLoggedIn : isLoggedIn,
   createUser : createUser,
   addFriend : addFriend,
   createGame : createGame,
   pickOption1 : pickOption1,
   pickOption2 : pickOption2,
   displayFriends : displayFriends,
   displayGames : displayGames,
   getUser : getUser,
   getGame : getGame
};