// https://haveibeenpwned.com/API/v2
// https://www.youtube.com/watch?v=hhUb5iknVJs
// Have You Been Pwned? - Computerphile
// Would you type your password into a random box on the internet? Dr Mike Pound on ensuring your 
// password hasn't already been hacked

    function createTheAPIcall(){
       let userInput = document.getElementById("passField").value;
        // console.log("password =  " + userInput);
        let shaHex = sha1(userInput);
        let shaKey = shaHex.substring(0, 5); // first four to send
        let shaMain = shaHex.substring(5, 40);// the part i want to search for in the results
        let shaMain2 = shaMain.toUpperCase();
        // console.log("full HEX =  " + shaHex);
        // console.log("Key =  " + shaKey);
         console.log("part to search = " + shaMain);
        let url = "https://api.pwnedpasswords.com/range/" + shaKey; // url that returns the list




       console.log("url = " + url);
       callTheAPI(url, shaMain2);



        

    }

    function callTheAPI(address, find){
      console.log("address = " + address);





   




      // make a request 
      let apiRequest = new XMLHttpRequest();
      apiRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // store the returned in a string
          let responseString = this.responseText;
          console.log(responseString);

          let findme = responseString.indexOf(find);// number at start position
          if (findme > 0){
            document.getElementById("found2").innerHTML = "Password is compromised";

          } else if (findme < 0){
            document.getElementById("found2").innerHTML = "wow you found a clean one!";

          }
          
          document.getElementById("found").innerHTML = findme;
          



          
        }
      };
      apiRequest.open("GET", address, true);
      apiRequest.send();

      

        
        

    }



 
