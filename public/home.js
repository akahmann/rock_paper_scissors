/********************************************************************
* Login user
********************************************************************/
function login() {

   var html = "";
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

   console.log("Send create account info to server");

   var html = "";

   var username = document.getElementById("new_username").value;
   var password = document.getElementById("new_password").value;

   var url = "../createUser/" + username + '/' + password;
   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200 && JSON.parse(this.responseText).success == true) {
         switchToLogin();
      }
      else {
         document.getElementById("error_message").innerHTML = "Error creating account, try different username";
      }
   };
   xhttp.open("POST", url, true);
   xhttp.send();

}

/********************************************************************
* Logout user
********************************************************************/
function logout() {

   var html = "";
   var url = "../logout/";
   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         if (obj.success == true) {
            switchToLogin();
         }
         else {
            document.getElementById("error_message").innerHTML = "Error logging out";
         }
      }
   };
   xhttp.open("POST", url, true);
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
         var text = "";

         for (var i = 0; i < obj.length; i++) {
            text += obj[i].username + "<br>";
         }

         document.getElementById("results").innerHTML = text;
      }

   };
   xhttp.open("GET", url, true);
   xhttp.send();
}

/********************************************************************
* Load login html
********************************************************************/
function switchToLogin() {

   console.log("Here switch");

   var html = "<h2>Login</h2>\n"
            + "<div id=\"error_message\"></div>\n"
            + "<div id=\"success_message\"></div>\n"
            + "Username: <input type=\"text\" value=\"Apple\""
            + "id=\"login_username\">\n<br>\n"
            + "Password: <input type=\"password\" value=\"apple\""
            + "id=\"login_password\">\n<br>\n"
            + "<button type=\"button\" onclick=\"switchToCreate()\">"
            + "Create Account</button>\n"
            + "<button type=\"button\" onclick=\"login()\">"
            + "Login</button>\n";

   document.getElementById("main_body").innerHTML = html;
}

/********************************************************************
* Logout user
********************************************************************/
function switchToLoggedIn(username) {

   console.log("Here switch");

   var html = "<h2>Welcome " + username + "</h2>\n"
            + "<div id=\"error_message\"></div>\n"
            + "<div id=\"success_message\"></div>\n"
            + "<button type=\"button\" onclick=\"displayFriends()\">\n"
            + "Display Friends</button>\n<br><br>\n"
            + "<div id=\"results\">\n</div>\n<br>\n"
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
            + "id=\"new_username\">\n<br>\n"
            + "Password: <input type=\"password\""
            + "id=\"new_password\">\n<br>\n"
            + "<button type=\"button\" onclick=\"switchToLogin()\">"
            + "Back to Login</button>\n"
            + "<button type=\"button\" onclick=\"createAccount()\">"
            + "Create Account</button>\n";

   document.getElementById("main_body").innerHTML = html;

}
