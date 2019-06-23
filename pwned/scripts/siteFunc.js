
  

 
    function createTheAPIcall(){
       let userInput = document.getElementById("passField").value;
        // console.log("password =  " + userInput);
        let shaHex = sha1(userInput);
        let shaKey = shaHex.substring(0, 5); // first four to send
        let shaMain = shaHex.substring(5, 40);// the part i want to search for in the results
        // console.log("full HEX =  " + shaHex);
        // console.log("Key =  " + shaKey);
         console.log("part to search = " + shaMain);
        let url = "https://api.pwnedpasswords.com/range/" + shaKey; // url that returns the list




           // console.log(address);

        // make a request 
        let apiRequest = new XMLHttpRequest();
        apiRequest.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            // store the returned in a string
            let responseString = this.responseText;

            let test = shaMain;
            console.log(responseString);
            console.log(typeof responseString);
            //createArray(responseString)
            var x = responseString.search(test);
      
                 console.log("----"+x);
          }
        };
        apiRequest.open("GET", url, true);
        apiRequest.send();

        //callTheAPI(url);

        

    }

    // function callTheAPI(address){
    //     // // console.log(address);

    //     // // make a request 
    //     // let apiRequest = new XMLHttpRequest();
    //     // apiRequest.onreadystatechange = function() {
    //     //   if (this.readyState == 4 && this.status == 200) {
    //     //     // store the returned in a string
    //     //     let responseString = this.responseText;
    //     //     // console.log(responseString);
    //     //     // console.log(typeof responseString);
    //     //     createArray(responseString)
    //     //   }
    //     // };
    //     // apiRequest.open("GET", address, true);
    //     // apiRequest.send();

        
        

    // }

    // function createArray(aString, findMainHex){
        //var res = aString.split(":");
        // var x = aString.search(findMainHex);
      
        // console.log("----"+res);
        // console.log(typeof res);
        //console.log(res[6]);
/*
        this will not work 
        the next index starts after the comma

        000DE94C4C9A9C72B4D02C8BBCB5F3627A5,1
        002EDB2852C132D9EEB2BA012862AA243DC,6
*/

      

    // }

 
