/********************************************************************
* Play Rock, Paper, Scissors
********************************************************************/
function playGame(opponent_username, username, game_id, opponent_id, player1_id, player2_id, option1, option2) {

   var html = "";
   var isPlayer1 = false;
   var selected = false;
   var opponent_selected = false;
   var youSelected = "";

   if (opponent_id != player1_id)
      isPlayer1 = true;
   //otherwise they must be player2

   //did the current player pick an option?
   if (isPlayer1 && option1 != 'n')
      selected = true;
   else if (!isPlayer1 && option2 != 'n')
      selected = true;

   //did the opponent pick an option?
   if (isPlayer1 && option2 != 'n')
      opponent_selected = true;
   else if (!isPlayer1 && option1 != 'n')
      opponent_selected = true;

   if (!selected) {
      html += "<h4>" + username + " vs. " + opponent_username + "</h4>\n"
           + "Select Option:<br>"
           + "<div class='flex-box'>"

           + "<img src=\"rock.png\" alt=\"rock\" id=\"rock\" "
           + "onclick=\"selectRock('" + opponent_username + "', '"
           + username + "', '" + game_id + "', '"
           + opponent_id + "', '" + player1_id + "', '"
           + player2_id + "', '" + option1 + "', '" + option2 + "', "
           + isPlayer1 + ")\">"

           + "<img src=\"paper.png\" alt=\"paper\" id=\"paper\" "
           + "onclick=\"selectPaper('" + opponent_username + "', '"
           + username + "', '" + game_id + "', '"
           + opponent_id + "', '" + player1_id + "', '"
           + player2_id + "', '" + option1 + "', '" + option2 + "', "
           + isPlayer1 + ")\">"

           + "<img src=\"scissors.png\" alt=\"scissors\" id=\"scissors\" "
           + "onclick=\"selectScissors('" + opponent_username + "', '"
           + username + "', '"+ game_id + "', '"
           + opponent_id + "', '" + player1_id + "', '"
           + player2_id + "', '" + option1 + "', '" + option2 + "', "
           + isPlayer1 + ")\">"

           + "</div><br><br>"

           + "<button type=\"button\" onclick=\""
           + "switchToLoggedIn('" + username + "')\">"
           + "Back</button><br>";
   }
   else if (!opponent_selected) {
      if (isPlayer1) {
         if (option1 == 'r')
            html += "<h4>" + username + " vs. " + opponent_username + "</h4>\n"
                 + "You Selected Rock<br><div class='flex-box'>"
                 + "<img src='rock.png' alt='rock' id='selected_pic'></div>";
         if (option1 == 'p')
            html += "<h4>" + username + " vs. " + opponent_username + "</h4>\n"
                 + "You Selected Paper<br><div class='flex-box'>"
                 + "<img src='paper.png' alt='paper' id='selected_pic'></div>";
         if (option1 == 's')
            html += "<h4>" + username + " vs. " + opponent_username + "</h4>\n"
                 + "You Selected Scissors<br><div class='flex-box'>"
                 + "<img src='scissors.png' alt='scissors' id='selected_pic'></div>";
      }
      else {
         if (option2 == 'r')
            html += "<h4>" + username + " vs. " + opponent_username + "</h4>\n"
                 + "You Selected Rock<br><div class='flex-box'>"
                 + "<img src='rock.png' alt='rock' id='selected_pic'></div>";
         if (option2 == 'p')
            html += "<h4>" + username + " vs. " + opponent_username + "</h4>\n"
                 + "You Selected Paper<br><div class='flex-box'>"
                 + "<img src='paper.png' alt='paper' id='selected_pic'></div>";
         if (option2 == 's')
            html += "<h4>" + username + " vs. " + opponent_username + "</h4>\n"
                 + "You Selected Scissors<br><div class='flex-box'>"
                 + "<img src='scissors.png' alt='scissors' id='selected_pic'></div>";
      }

      html += "<span>Press update page to see if you opponent has made their selection</span>"
           + "<br><br><button type=\"button\" onclick=\""
           + "updateGamePage('" + opponent_username + "', '" + username + "', '"
           + game_id + "', '" + opponent_id + "', '" + player1_id + "', '"
           + player2_id + "', '" + option1 + "', '"
           + option2 + "')\">Update Page</button><br><br>"

           + "<button type=\"button\" onclick=\""
           + "switchToLoggedIn('" + username + "')\">"
           + "Back</button><br>";
   }
   else {
      html += "<span>Press update page to see if you opponent has made their selection</span>"
           + "<br><br><button type=\"button\" onclick=\""
           + "updateGamePage('" + opponent_username + "', '" + username + "', '"
           + game_id + "', '" + opponent_id + "', '" + player1_id + "', '"
           + player2_id + "', '" + option1 + "', '"
           + option2 + "')\">Update Page</button><br><br>"
      console.log("This is option1: " + option1);
      console.log("This is option2: " + option2);
      //Then both users must have selected their options
      if (isPlayer1) {
         console.log("isPlayer1 is true");
         //winning case scenarios
         if ((option1 == 'r' && option2 == 's') ||
             (option1 == 'p' && option2 == 'r') ||
             (option1 == 's' && option2 == 'p'))
            html += "<h2>You Win!</h2><div class='flex-box'><img src='youWin.gif' alt='youWin' id='gif'>"
                 + "</div><button type=\"button\" onclick=\""
                 + "switchToLoggedIn('" + username + "')\">"
                 + "Back</button><br>";
         //losing case scenarios
         else if ((option1 == 'r' && option2 == 'p') ||
                  (option1 == 'p' && option2 == 's') ||
                  (option1 == 's' && option2 == 'r'))
            html += "<h5>You Lose!</h5><div class='flex-box'><img src='youLose.gif' alt='youLose' id='gif'>"
                 + "</div><button type=\"button\" onclick=\""
                 + "switchToLoggedIn('" + username + "')\">"
                 + "Back</button><br>";
         //then it must be a tie
         else
            html += "<h5>It's a Tie!</h5><div class='flex-box'><img src='itsATie.gif' alt='itsATie' id='gif'>"
                 + "</div><button type=\"button\" onclick=\""
                 + "switchToLoggedIn('" + username + "')\">"
                 + "Back</button><br>";
      }
      else {
         console.log("isPlayer1 is false");
         //winning case scenarios
         if ((option2 == 'r' && option1 == 's') ||
             (option2 == 'p' && option1 == 'r') ||
             (option2 == 's' && option1 == 'p'))
            html += "<h2>You Win!</h2><div class='flex-box'><img src='youWin.gif' alt='youWin' id='gif'>"
                 + "</div><button type=\"button\" onclick=\""
                 + "switchToLoggedIn('" + username + "')\">"
                 + "Back</button><br>";
         //losing case scenarios
         else if ((option2 == 'r' && option1 == 'p') ||
                  (option2 == 'p' && option1 == 's') ||
                  (option2 == 's' && option1 == 'r'))
            html += "<h5>You Lose!</h5><div class='flex-box'><img src='youLose.gif' alt='youLose' id='gif'>"
                 + "</div><button type=\"button\" onclick=\""
                 + "switchToLoggedIn('" + username + "')\">"
                 + "Back</button><br>";
         //then it must be a tie
         else
            html += "<h5>It's a Tie!</h5><div class='flex-box'><img src='itsATie.gif' alt='itsATie' id='gif'>"
                 + "</div><button type=\"button\" onclick=\""
                 + "switchToLoggedIn('" + username + "')\">"
                 + "Back</button><br>";
      }
   }

   document.getElementById("main_body").innerHTML = html;
}

/********************************************************************
* Play Rock, Paper, Scissors
********************************************************************/
function updateGamePage(opponent_username, username, game_id, opponent_id, player1_id, player2_id, option1, option2) {

   var url = "../getGame/" + game_id;
   console.log("This is url: " + url);
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200 && JSON.parse(this.responseText).length != 0) {
         console.log(JSON.parse(this.responseText));
         var obj = JSON.parse(this.responseText);
         opponent_id = obj.id;
         player1_id = obj.player1_id;
         player2_id = obj.player2_id;
         option1 = obj.option1;
         option2 = obj.option2;
      }
      console.log("In updateGamePage opponent_id is: " + opponent_id);
      playGame(opponent_username, username, game_id, opponent_id, player1_id, player2_id, option1, option2);

   };

   xhttp.open("GET", url, true);
   xhttp.send();
}

/********************************************************************
* Player selects rock
********************************************************************/
function selectRock(opponent_username, username, game_id, opponent_id, player1_id, player2_id, option1, option2, isPlayer1) {
   var url = "";
   if (isPlayer1) {
      option1 = 'r';
      url = "../pickOption1/" + game_id + '/' + option1;
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if (obj.success == false) {
               console.log("Updating game failed");
               option1 = 'n';
            }
         }
      };
      xhttp.open("POST", url, true);
      xhttp.send();
   }
   else {
      option2 = 'r';
      url = "../pickOption2/" + game_id + '/' + option2;
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if (obj.success == false) {
               console.log("Updating game failed");
               option2 = 'n';
            }
         }
      };
      xhttp.open("POST", url, true);
      xhttp.send();
   }
   playGame(opponent_username, username, game_id, opponent_id, player1_id, player2_id, option1, option2);
}

/********************************************************************
* Player selects paper
********************************************************************/
function selectPaper(opponent_username, username, game_id, opponent_id, player1_id, player2_id, option1, option2, isPlayer1) {
   var url = "";
   if (isPlayer1) {
      option1 = 'p';
      url = "../pickOption1/" + game_id + '/' + option1;
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if (obj.success == false) {
               console.log("Updating game failed");
               option1 = 'n';
            }
         }
      };
      xhttp.open("POST", url, true);
      xhttp.send();
   }
   else {
      option2 = 'p';
      url = "../pickOption2/" + game_id + '/' + option2;
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if (obj.success == false) {
               console.log("Updating game failed");
               option2 = 'n';
            }
         }
      };
      xhttp.open("POST", url, true);
      xhttp.send();
   }
   playGame(opponent_username, username, game_id, opponent_id, player1_id, player2_id, option1, option2);
}

/********************************************************************
* Player selects scissors
********************************************************************/
function selectScissors(opponent_username, username, game_id, opponent_id, player1_id, player2_id, option1, option2, isPlayer1) {
   var url = "";
   if (isPlayer1) {
      option1 = 's';
      url = "../pickOption1/" + game_id + '/' + option1;
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if (obj.success == false) {
               console.log("Updating game failed");
               option1 = 'n';
            }
         }
      };
      xhttp.open("POST", url, true);
      xhttp.send();
   }
   else {
      option2 = 's';
      url = "../pickOption2/" + game_id + '/' + option2;
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if (obj.success == false) {
               console.log("Updating game failed");
               option2 = 'n';
            }
         }
      };
      xhttp.open("POST", url, true);
      xhttp.send();
   }
   playGame(opponent_username, username, game_id, opponent_id, player1_id, player2_id, option1, option2);
}

/********************************************************************
* Login user
********************************************************************/
function login() {

   var username = document.getElementById("login_username").value;
   var password = document.getElementById("login_password").value;
   var url = "../login/" + username + '/' + password;
   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         if (obj.success == true) {
            switchToLoggedIn(username);
         }
         else {
            document.getElementById("error_message").innerHTML = "Incorrect username or password";
            document.getElementById("success_message").innerHTML = "";
         }
      }
   };
   xhttp.open("POST", url, true);
   xhttp.send();
}

/********************************************************************
* Create Account
********************************************************************/
function createAccount() {

   var username = document.getElementById("new_username").value;
   var password = document.getElementById("new_password").value;

   var url = "../createUser/" + username + '/' + password;
   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200 && JSON.parse(this.responseText).success == true) {
         switchToLogin();
         document.getElementById("error_message").innerHTML = "";
         document.getElementById("success_message").innerHTML = "Successfully Created Account";
      }
      else {
         document.getElementById("error_message").innerHTML = "Error creating account, try different username";
         document.getElementById("success_message").innerHTML = "";
      }
   };
   xhttp.open("POST", url, true);
   xhttp.send();

}

/********************************************************************
* Find friend id and call add friend
********************************************************************/
function findFriendId() {

   var username = document.getElementById("friend_username").value;

   var url = "../getUser/" + username;
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200 && JSON.parse(this.responseText).length != 0) {
         var id = JSON.parse(this.responseText).id;
         addFriend(id);
      }
      else {
         document.getElementById("error_message_add").innerHTML = "Can't find user";
      }

   };

   xhttp.open("GET", url, true);
   xhttp.send();
}

/********************************************************************
* Add friend to current user
********************************************************************/
function addFriend(id) {

   var url = "../addFriend/" + id;
   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200 && JSON.parse(this.responseText).success == true) {
         document.getElementById("error_message_add").innerHTML = "";
         document.getElementById("success_message_add").innerHTML = "Successfully added friend";
      }
      else {
         document.getElementById("error_message_add").innerHTML = "Error adding friend";
         document.getElementById("success_message_add").innerHTML = "";
      }
   };

   xhttp.open("POST", url, true);
   xhttp.send();

}

/********************************************************************
* Find friend id and challenge them
********************************************************************/
function challengeFriend(username) {

   console.log("Here1");

   var url = "../getUser/" + username;
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200 && JSON.parse(this.responseText).length != 0) {
         var id = JSON.parse(this.responseText).id;
         createGame(id);
      }
      else {
         document.getElementById("error_message_friends").innerHTML = "Can't find user";
      }

   };

   xhttp.open("GET", url, true);
   xhttp.send();
}

/********************************************************************
* Add friend to current user
********************************************************************/
function createGame(id) {

   console.log("Here2");

   var url = "../createGame/" + id;
   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200 && JSON.parse(this.responseText).success == true) {
         document.getElementById("error_message_friends").innerHTML = "";
         document.getElementById("success_message_friends").innerHTML = "Successfully challenged friend";
      }
      else {
         document.getElementById("error_message_friends").innerHTML = "Error challenging friend";
         document.getElementById("success_message_friends").innerHTML = "";
      }
   };

   xhttp.open("POST", url, true);
   xhttp.send();

}

/********************************************************************
* Logout user
********************************************************************/
function logout() {

   var url = "../logout";
   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         if (obj.success == true) {
            switchToLogin();
         }
         else {
            document.getElementById("error_message").innerHTML = "Error logging out";
            document.getElementById("success_message").innerHTML = "";
         }
      }
   };
   xhttp.open("POST", url, true);
   xhttp.send();
}

/********************************************************************
* Onload event if user refreshes the page.
********************************************************************/
function refresh() {

   var url = "../isLoggedIn";
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200 && JSON.parse(this.responseText).length != 0) {
         var username = JSON.parse(this.responseText).username;
         switchToLoggedIn(username);
      }
      else {
         switchToLogin();
      }

   };

   xhttp.open("GET", url, true);
   xhttp.send();

}

/********************************************************************
* Display all friends of user
********************************************************************/
function displayFriends() {

   var url = "../displayFriends";
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {
         console.log(JSON.parse(this.responseText));
         var obj = JSON.parse(this.responseText);
         var text = "<h3>Select Friend to Challenge</h3>";
         text += "<div id=\"error_message_friends\"></div>"
              + "<div id=\"success_message_friends\"></div>"

         for (var i = 0; i < obj.length; i++) {
            text += "<button type=\"button\" onclick=\""
                 + "challengeFriend('" + obj[i].username
                 + "')\" id=\"sub_button\">" + obj[i].username
                 + "</button><br><br>";
         }

         document.getElementById("friend_results").innerHTML = text;
      }

   };
   xhttp.open("GET", url, true);
   xhttp.send();
}

/********************************************************************
* Load play game html
********************************************************************/
function viewGames(username) {

   var url = "../displayGames";
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {
         console.log("CHECK HERE: ");
         console.log(JSON.parse(this.responseText));
         var obj = JSON.parse(this.responseText);
         var text = "<h3>All Games</h3>";

         for (var i = 0; i < obj.length; i++) {
            if (obj[i].username != username) {

               text += "<button type=\"button\" onclick=\""
                    + "playGame('" + obj[i].username + "', '" + username + "', '"
                    + obj[i].game_id + "', '"
                    + obj[i].id + "', '" + obj[i].player1_id + "', '"
                    + obj[i].player2_id + "', '" + obj[i].option1 + "', '"
                    + obj[i].option2 + "')\" id=\"sub_button\">Vs. "
                    + obj[i].username + "</button><br><br>";
            }
         }

         document.getElementById("view_games").innerHTML = text;
      }

   };
   xhttp.open("GET", url, true);
   xhttp.send();
}

/********************************************************************
* Load add friend html
********************************************************************/
function displayAddFriend(username) {

   console.log("Here Add Friend");

   var html = "<h3>Add Friend</h3>\n"

            + "<div id=\"error_message_add\"></div>\n"

            + "<div id=\"success_message_add\"></div>\n"

            + "<h3>New Friend's Username:</h3>\n"

            + "<input type=\"text\" id=\"friend_username\">\n<br>\n"

            + "<button type=\"button\" onclick=\"findFriendId()\""
            + " id=\"sub_button\">Add Friend</button>\n<br><br>\n";

   document.getElementById("add_friend").innerHTML = html;
}

/********************************************************************
* Load login html
********************************************************************/
function switchToLogin() {

   console.log("Here switch");

   var html = "<h2>Login</h2>\n"

            + "<div id=\"error_message\"></div>\n"

            + "<div id=\"success_message\"></div>\n"

            + "Username: <input type=\"text\"id=\"login_username\">\n<br>\n"

            + "Password: <input type=\"password\"id=\"login_password\">\n<br>\n"

            + "<button type=\"button\" onclick=\"switchToCreate()\">"
            + "Create Account</button>\n"

            + "<button type=\"button\" onclick=\"login()\">"
            + "Login</button>\n";

   document.getElementById("main_body").innerHTML = html;
}

/********************************************************************
* Load logged in html
********************************************************************/
function switchToLoggedIn(username) {

   console.log("Here switch");

   var html = "<h2>Welcome " + username + "</h2>\n"

            + "<div id=\"error_message\"></div>\n"

            + "<div id=\"success_message\"></div>\n"

            + "<button type=\"button\" onclick=\"viewGames('"
            + username + "')\""
            + " id=\"view_games_button\">View Games</button>\n<br>\n"

            + "<div id=\"view_games\">\n</div>\n<br>\n"

            + "<button type=\"button\" onclick=\"displayFriends()\""
            + " id=\"display_friends_button\">Display Friends</button>\n<br>\n"

            + "<div id=\"friend_results\">\n</div>\n<br>\n"

            + "<button type=\"button\" onclick=\"displayAddFriend()\""
            + " id=\"add_friend_button\">Add Friend</button>\n<br>\n"

            + "<div id=\"add_friend\">\n</div>\n<br>\n"

            + "<button type=\"button\" onclick=\"logout()\">"
            + "Logout</button>\n";

   document.getElementById("main_body").innerHTML = html;
}

/********************************************************************
* Load create account html
********************************************************************/
function switchToCreate() {

   console.log("Here create");

   var html = "<h2>Create Account</h2>\n"

            + "<div id=\"error_message\"></div>\n"

            + "<div id=\"success_message\"></div>\n"

            + "Username: <input type=\"text\""
            + "id=\"new_username\">\n<br>"

            + "Password: <input type=\"password\""
            + "id=\"new_password\">\n<br>\n"

            + "<button type=\"button\" onclick=\"switchToLogin()\">"
            + "Back to Login</button>\n"

            + "<button type=\"button\" onclick=\"createAccount()\">"
            + "Create Account</button>\n";

   document.getElementById("main_body").innerHTML = html;

}