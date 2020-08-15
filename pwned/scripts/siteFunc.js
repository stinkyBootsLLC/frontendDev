// https://haveibeenpwned.com/API/v2
// https://www.youtube.com/watch?v=hhUb5iknVJs
// Have You Been Pwned? - Computerphile
// Would you type your password into a random box on the internet? Dr Mike Pound on ensuring your 
// password hasn't already been hacked

/**
 * UPDATE 8/15/2020
 * Displaying the amount of times the password has been comprimised
 */

/**
 * Adds commas to numbers
 * @param {Number} nNumber 
 * @returns {String}
 */
function addCommasToNumber(nNumber) {
  return nNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}// addCommasToNumber()

/**
 * Creates the SHA-1
 */
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
    callTheAPI(urlpass, shaMain2);
  }// end if(userInput === "")
}// end createTheAPIcall()

/**
 * Sending and Receiving Data by Using the XMLHttpRequest Object
 * @param {string} address 
 * @param {string} find 
 */
function callTheAPI(address, find){
  // make a request 
  let apiRequest = new XMLHttpRequest();
  apiRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // store the returned in a string
      let responseString = this.responseText;
      let nFoundHash = responseString.indexOf(find);// number at start position
      //////////// F I N D  T H E  A M O U N T ////////////////////////////////////////
      let x = responseString.slice(nFoundHash+36, nFoundHash+77);
      let aRespString = x.split("\n");  // now this is an array 
      let sCompAmount = addCommasToNumber(aRespString[0]); // index 0 is the amount
      console.log (sCompAmount);
      //////////// F I N D  T H E  A M O U N T ////////////////////////////////////////
      if (nFoundHash > 0){
        // the hash was found in the database
        let badPassResult = document.getElementById("display");
        badPassResult.style.color = "red";
        badPassResult.innerHTML = "Password has been compromised <mark><strong>" + sCompAmount + " </strong></mark>times!";
      } else {
        // not found
        let goodPassResult = document.getElementById("display");
        goodPassResult.style.color = "green";
        goodPassResult.innerHTML = "Clean password!";
      } // end if (foundHash > 0)
    }// end if(this.readyState == 4 && this.status == 200)
  };
  apiRequest.open("GET", address, true);
  apiRequest.send();
}// end callTheAPI()

/**
 * Send data to a web service and receive data from a web service by using the Fetch API object.
 */
function siteBreach(){
  let userInput = document.getElementById("allbreaches").value;
  if(userInput === ""){
    alert("Domain Name cannot be BLANK");
  } else {
    let urlDomainName = "https://haveibeenpwned.com/api/breaches?domain=" + userInput;
    fetch(urlDomainName)
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
        domainTitle.innerHTML = "Domain Name: " + domainName.replace(/['"]+/g, '').toUpperCase() + "<br> Breach date:  " + breachedDate;
        descriptionDisplay.innerHTML = description.replace(/['"]+/g, '');
        // append and remove double quotes
        companyLogo.src = logoPath.replace(/['"]+/g, '');
        cardFooter.innerHTML = "Total compromised accounts:  <strong>" + pwnCount + "</strong>";
        //  remove and add css classes
        fullDisplay.classList.remove('domainNameDisplay');
        fullDisplay.classList.add('displaydomainNameResults')
      })
      // error handling
      .catch(error => alert('There is no information on "' + userInput + '"'));
  } // end if(userInput === "")
}// end siteBreach()

/**
 * get all domain names from the API and display in options for select element
 */
function allBreachedDomains(){
  const urlAllDomains = "https://haveibeenpwned.com/api/v2/breaches";
    fetch(urlAllDomains)
      .then((resp) => resp.json())
      .then((data) => {
        const selectAllDomainNames = document.getElementById("allbreaches");
        let domainNameValue = "";
        let name = "";
        for (let i = 0; i < data.length; i++) {
          domainNameValue = JSON.stringify(data[i].Domain);
          name = domainNameValue.replace(/['"]+/g, '')
          selectAllDomainNames.options[selectAllDomainNames.options.length] = new Option(name)
        }// end for all domain names
      })
      .catch(error => console.log(error));
}// end allBreachedDomains()

/**
 * Generates a random password based on user length Element.
 */
function randomPassGen(){
  // declare constant variables
  const displayElement = document.getElementById("pass_display")
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!"#$%&\'()*+,-./:;<=>?@^[\\]^_`{|}~';
  const all = uppercase + lowercase + numbers + symbols;
  const lengthElement = document.getElementById("Length");
  let length = lengthElement.value;
  let password = '';
  // if length is NOT a null string
  if(length){
    // loop for the select length
    for (let index = 0; index < length; index++) {
      let character = Math.floor(Math.random() * all.length);
      password += all.substring(character, character + 1);
    }// end for
    // remove the style attribute
    lengthElement.removeAttribute('style')
    // display the randomly generated password
    displayElement.value = password;
  } else {
    // display the error
    displayElement.value = "Length cannot be blank";
    // add the style attribute
    lengthElement.setAttribute("style", "background-color: red;");
  }// end if 
}// end randomPassGen()










 
