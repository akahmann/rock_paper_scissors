function displayFriends() {

   console.log(document.getElementById("input").value);
   var input = document.getElementById("input").value;
   var url = "https://fierce-fjord-41875.herokuapp.com/displayFriends/" + input;
   //var url = "../displayFriends/" + input;
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         console.log(obj);
         var text = "<div class=\"midbody\">";

         for (var i = 0; i < obj.length; i++) {
            text += obj[i].username + "<br>";
         }

         text += "</div>";
         console.log(text);
         document.getElementById("results").innerHTML = text;
      }

   };
   xhttp.open("GET", url, true);
   xhttp.send();
}