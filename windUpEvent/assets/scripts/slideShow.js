
var counter = 0;
carousel();
// runs the slideshow
function carousel() {
  let slides = document.getElementsByClassName("slide");
  let caption = document.getElementsByClassName("cap");

  for (let index = 0; index < slides.length; index++) {
    slides[index].style.display = "none";  
    caption[index].style.display = "none"; 
  }
  counter++;

  if (counter > slides.length) {
    counter = 1
    }    
  slides[counter-1].style.display = "block";  
  caption[counter-1].style.display = "block";  
  setTimeout(carousel, 7000); // Change image every 7 seconds
}
