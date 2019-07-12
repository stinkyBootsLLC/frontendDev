// https://haveibeenpwned.com/API/v2
// https://www.youtube.com/watch?v=hhUb5iknVJs
// Have You Been Pwned? - Computerphile
// Would you type your password into a random box on the internet? Dr Mike Pound on ensuring your 
// password hasn't already been hacked

    function creatPassWordSHA(){
      const userInput = document.getElementById("passField").value;
      if(userInput === ""){
        alert("password field cannot be BLANK");
      } else {
        let shaHex = sha1(userInput);
        // first four to send
        let shaKey = shaHex.substring(0, 5);
        let shaMain = shaHex.substring(5, 40);// the part i want to search for in the results
        let shaMain2 = shaMain.toUpperCase();
        console.log("full HEX =  " + shaHex);
        console.log("Key =  " + shaKey);
        console.log("part to search = " + shaMain);
        let urlpass = "https://api.pwnedpasswords.com/range/" + shaKey; // url that returns the list
        //console.log("url = " + url);
        callTheAPI(urlpass, shaMain2);
      }// end if(userInput === "")
    }// end createTheAPIcall()

    // Sending and Receiving Data by Using the XMLHttpRequest Object
    function callTheAPI(address, find){
      // make a request 
      let apiRequest = new XMLHttpRequest();
      apiRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // store the returned in a string
          let responseString = this.responseText;
          // console.log(responseString);
          let foundHash = responseString.indexOf(find);// number at start position
          if (foundHash > 0){
            // the hash was found in the database
            let badPassResult = document.getElementById("display");
            badPassResult.style.color = "red";
            badPassResult.innerHTML = "this password is compromised!";
          } else {
            // not found
            let goodPassResult = document.getElementById("display");
            goodPassResult.style.color = "green";
            goodPassResult.innerHTML = "wow you found a clean one!";
          } // end if (foundHash > 0)
        }// end if(this.readyState == 4 && this.status == 200)
      };
      apiRequest.open("GET", address, true);
      apiRequest.send();
    }// end callTheAPI()
	
    // Send data to a web service and receive data from a web service by using the Fetch API object.
    function siteBreach(){
      let userInput = document.getElementById("domainName").value;
      if(userInput === ""){
        alert("Domain Name cannot be BLANK");
      } else {
        let urlDomain = "https://haveibeenpwned.com/api/breaches?domain=" + userInput;
        fetch(urlDomain)
          .then((resp) => resp.json())
          .then((data) => {
            const fullDisplay = document.getElementById("domainNameDisplay");
            const domainTitle = document.getElementById("domainTitle");
            const descriptionDisplay = document.getElementById("description");
            const companyLogo = document.getElementById("logo");
            const cardFooter = document.getElementById("cardFooter");
            let domainName = JSON.stringify(data[0].Domain);
            let breachedDate = JSON.stringify(data[0].BreachDate);
            let description = JSON.stringify(data[0].Description);
            let logoPath = JSON.stringify(data[0].LogoPath);
            let pwnCount = JSON.stringify(data[0].PwnCount);
            // render HTML
            domainTitle.innerHTML = domainName.replace(/['"]+/g, '').toUpperCase() + " Breached on " + breachedDate;
            descriptionDisplay.innerHTML = description.replace(/['"]+/g, '');
            // append and remove double quotes
            companyLogo.src = logoPath.replace(/['"]+/g, '');
            cardFooter.innerHTML = "The total number of accounts loaded into the system. =  <strong>" + pwnCount + "</strong>";
            //  remove and add css classes
            fullDisplay.classList.remove('domainNameDisplay');
            fullDisplay.classList.add('displayResults')
          })
          // error handling
          .catch(error => alert('There is no information on "' + userInput + '"'));
      } // end if(userInput === "")
    }// end siteBreach()


 
