/********************************************************************
* Login user
********************************************************************/
function login() {

   //will have to do some logic here to login

   console.log("Here login");

   var html = "<h2>Welcome "
            + document.getElementById("login_username").value
            + "</h2>\n"
            + "<input type=\"text\" value=\"1\" id=\"input\"> \n<br>\n"
            + "<button type=\"button\" onclick=\"displayFriends()\">\n"
            + "Display Friends</button>\n<br><br>\n"
            + "<div id=\"results\">\n</div>\n<br>\n"
            + "<button type=\"button\" onclick=\"logout()\">"
            + "Logout</button>\n";

   document.getElementById("main_body").innerHTML = html;
}

/********************************************************************
* Create Account
********************************************************************/
function crtAccount() {

   console.log("Here create");

   var html = "<h2>Create Account</h2>\n"
            + "Username: <input type=\"text\" value=\"Apple\""
            + "id=\"login_username\">\n<br>\n"
            + "Password: <input type=\"password\" value=\"apple\""
            + "id=\"login_password\">\n<br>\n"
            + "<button type=\"button\" onclick=\"login()\">"
            + "Login</button>\n";

   document.getElementById("main_body").innerHTML = html;

}

/********************************************************************
* Logout user
********************************************************************/
function switchToLogin() {

   console.log("Here switch");

   var html = "<h2>Login</h2>\n"
            + "Username: <input type=\"text\" value=\"Apple\""
            + "id=\"login_username\">\n<br>\n"
            + "Password: <input type=\"password\" value=\"apple\""
            + "id=\"login_password\">\n<br>\n"
            + "<button type=\"button\" onclick=\"crtAccount()\">"
            + "Create Account</button>\n"
            + "<button type=\"button\" onclick=\"login()\">"
            + "Login</button>\n";

   document.getElementById("main_body").innerHTML = html;
}

/********************************************************************
* Logout user
********************************************************************/
function logout() {

   //will have to do some logic here to logout

   console.log("Here logout");

   var html = "<h2>Login</h2>\n"
            + "Username: <input type=\"text\" value=\"Apple\""
            + "id=\"login_username\">\n<br>\n"
            + "Password: <input type=\"password\" value=\"apple\""
            + "id=\"login_password\">\n<br>\n"
            + "<button type=\"button\" onclick=\"crtAccount()\">"
            + "Create Account</button>\n"
            + "<button type=\"button\" onclick=\"login()\">"
            + "Login</button>\n";

   document.getElementById("main_body").innerHTML = html;
}

/********************************************************************
* Display all friends of user
********************************************************************/
function displayFriends() {

   console.log(document.getElementById("input").value);
   var input = document.getElementById("input").value;
   var url = "../displayFriends/" + input;
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {
         console.log(JSON.parse(this.responseText));
         var obj = JSON.parse(this.responseText);
         //console.log(obj);
         //var text = "<div class=\"midbody\">";
         var text = "";

         for (var i = 0; i < obj.length; i++) {
            text += obj[i].username + "<br>";
         }

         //text += "</div>";
         document.getElementById("results").innerHTML = text;
      }

   };
   xhttp.open("GET", url, true);
   xhttp.send();
}