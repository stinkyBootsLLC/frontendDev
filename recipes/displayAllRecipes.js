/**
 * Sets the recipe PK-ID into local storage.
 * @param {String} element_ID 
 */
function setRecipeID(element_ID){
    // error handling has been added in recipe.js (2 Jan 21)
    sessionStorage.setItem('recipe', escape(element_ID) );
}// end setRecipeID()

/**
 * Displays all the recipes in the JSON as a table.
 */
function displayTable(){

    const mainTableElement = $("#main-table");
    const recipes = 'assets/db/recipes.json';

    fetch(recipes).then(response => {
        return response.json()
    }).then(data => {
    // loop thru the recipes in the data obj
        for (recipe in data) {
            idName = "recipe-row-" + recipe;
            let recipeRow = $(`<tr id='${idName}'></tr>`);
            // when clicked needs to grab the id of the row and id of the recipe
            // recipeRow.append(`<th scope='row'>x</th>`);
            recipeRow.append(`<td><a id='${data[recipe]["id"]}' onclick='setRecipeID(this.id);'  
            href='recipe.html'><img src='recipeImages/${data[recipe]["picture"]}' 
            alt='picture of ${data[recipe]["title"]}' style='height: 50px;' 
            aria-label='click for ${data[recipe]["title"]} recipe details'></a></td>`);
            recipeRow.append(`<td>${data[recipe]["title"]}</td>`);
            recipeRow.append(`<td>${data[recipe]["Category"]}</td>`);
            mainTableElement.append(recipeRow);
        }// end for each recipe in data
    }).catch(err => {
        // Do something for an error here
       alert('unable to fetch recipes.json ' + err);
    });
}// end displayTable()    

$( document ).ready(function() {
    displayTable();
});    