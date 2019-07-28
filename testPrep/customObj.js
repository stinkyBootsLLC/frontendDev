
// this is the custom object
let movie = {
    title: "",
    date: new Date(),
    init: function(title, date){
        this.title = title;
        this.date = date;
    }
};

// set the movies 
const movieNum1 = Object.create(movie);
movieNum1.init("Reservoir Dogs",1992);
// second movie object
const movieNum2 = Object.create(movie);
movieNum2.init("Pulp Fiction",1994);
// third movie object
const movieNum3 = Object.create(movie);
movieNum3.init("inglourious Basterds",2009);

/*
 * Display the custom object to the DOM
 */
function displayCustomObject(){
    // declare the variables
    let movie1Title1 = movieNum1.title + " released - " + movieNum1.date;
    let movie1Title2 = movieNum2.title + " released - " + movieNum2.date;
    let movie1Title3 = movieNum3.title + " released - " + movieNum3.date;
    // create elements to add to custom obj div
    let divTitle = '<h3>This is a custom Movie object</h3>';
    $(divTitle).insertBefore("#movieList");
    // append to <ul>  using jQuery  
    $("#movieList").append("<li>" + movie1Title1 + "</li>");
    $("#movieList").append("<li>" + movie1Title2 + "</li>");
    $("#movieList").append("<li>" + movie1Title3 + "</li>");
}// end displayCustomObject()

// now call the function via jQuery 
$(displayCustomObject);
