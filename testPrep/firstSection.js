// https://www.chartjs.org/

function disPlayResults(elementID, textValue){
    // create a new div element 
    var newDiv = document.createElement("div"); 
    // and give it some content 
    var newContent = document.createTextNode(textValue); 
    // add the text node to the newly created div
    newDiv.appendChild(newContent);  
    // add the newly created element and its content into the DOM 
    var currentDiv = document.getElementById(elementID); 
    currentDiv.appendChild(newDiv);
}// end disPlayResults()

function addElement () { 
  // create a new div element 
  var newDiv = document.createElement("div"); 
  // and give it some content 
  var newContent = document.createTextNode("this element has been progromatically added! from index.js"); 
  // add the text node to the newly created div
  newDiv.appendChild(newContent);  
  // add the newly created element and its content into the DOM 
  var currentDiv = document.getElementById("addAnElement"); 
  currentDiv.appendChild(newDiv);
  //document.body.insertBefore(newDiv, currentDiv); 
}

function changeAttributes(newColor) {
    var newDiv = document.getElementById("addAnElement")
    newDiv.setAttribute("style", "color:" + newColor + "; background-color: beige; padding-bottom: 2px; margin: 3px;");
}// end changeAttributes

function drawSVGz(){
    //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
    var canvas = document.getElementById("myCanvas");
        if (canvas.getContext) {
        // The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, 
        // or null if the context identifier is not supported.
        // canvas.getContext(contextType, contextAttributes);
        // "2d", leading to the creation of a CanvasRenderingContext2D object representing a 
        // two-dimensional rendering context.
            var ctx = canvas.getContext('2d');
            // Draws a filled rectangle. fillRect(x, y, width, height)
            ctx.fillRect(25, 25, 200, 100);
            // Clears the specified rectangular area, making it fully transparent.
            ctx.clearRect(45, 45, 60, 60);
            // Draws a rectangular outline.
            ctx.strokeRect(50, 50, 50, 50);
            ctx.font = "12px Arial";
            // fillText(text,x,y) - draws "filled" text on the canvas
            ctx.fillText("drawing on the canvas via JS", 60, 180);
        }
}// end drawSVGz()


function moveDIv(x_pos, y_pos) {
    var element = document.getElementById('moveMe');
    element.style.position = "absolute";
    element.style.left = x_pos+'px';
    element.style.top = y_pos+'px';
}// end moveDiv


// function addTransform(x_pos, y_pos) {
//     var maindiv = document.getElementById("div1");
//     maindiv.classList.add("div1a");
//     var element2 = document.getElementById("div2");
//     element2.classList.add("div2a");
//     var element3 = document.getElementById("div3");
//     element3.classList.add("div3a");
//     maindiv.style.position = "absolute";
//     maindiv.style.left = x_pos+'px';
  
//     maindiv.style.top = y_pos+'px';
//      element3.style.left = x_pos+'px';
//      element3.style.top = y_pos+'px';
// }// end addTransform()

function hideElement() {
    var element = document.getElementById("hideDiv");
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}// end hideElement()

function setLocalStorage(){
    localStorage.setItem('KEY1','12345');
    var myKey = localStorage.getItem('KEY1')
    var newContent =("local storage value = " + myKey); 
    disPlayResults("localStorageDiv", newContent);
}// end setLocalStorage()

function emptyLocalStorage(){
    // Clear all items
    localStorage.clear();
    var element = document.getElementById("localStorageDiv");
    element.style.display = "none";
}// end emptyLocalStorage()


function createSessionStorage(){
    // Save data to sessionStorage
    sessionStorage.setItem('sessionKey', 'kalee is a demon');
    // Get saved data from sessionStorage
    let SessionValue = sessionStorage.getItem('sessionKey');
    var newContent = ("Session storage value = " + SessionValue);
    disPlayResults("sessionStoragediv", newContent);
}// end createSessionStorage()



function emptySessionStorage(){
    // Remove all saved data from sessionStorage
    sessionStorage.clear();
    // Remove saved data from sessionStorage
    // sessionStorage.removeItem('key');
}// end emptySessionStorage()


function geoGetLocation(){
    // get geolocation
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("getting geoLocation");
        if ("geolocation" in navigator) {
            /* geolocation is available */
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let timeStamp = new Date(position.timestamp);
            myPosition = ("latitude = " + lat + " longitude = " + long + " - TimeStamp -  " + timeStamp);
            disPlayResults("myCurrentGPSpos", myPosition);
            console.log(position);
            geoWatchLocation();
        } else {
        /* geolocation IS NOT available */
        alert("geolocation IS NOT available");
        console.log("geolocation IS NOT available");
        }
    });

}// end geoGetLocation()

function geoWatchLocation(){
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(function(position) {
        /* geolocation is available */
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let timeStamp = new Date(position.timestamp);
        myPosition = ("latitude = " + lat + " longitude = " + long + " - TimeStamp -  " + timeStamp);
        disPlayResults("changedGPSpos", myPosition);
        console.log(position);
    });
    } else {
        /* geolocation IS NOT available */
        console.log("geolocation IS NOT available");
    }
}// end geoWatchLocation()

function getSquareRoot(){
    // lets use jQuery to get the value
    let number = $('#number').val();
    let answer = Math.sqrt(number);
    $('<p>'+ answer + '</p>').insertAfter( "#sqrtButton" );
    console.log(answer);



}//end getSquareRoot()




