/**
 * Sets the recipe PK-ID into local storage.
 * @param {String} element_ID 
 */
function setRecipeID(element_ID){
    let recipe_id = $("#" + element_ID).text().trim();
    // currently this escape protects app but breaks logic
    localStorage.setItem('recipe', escape(recipe_id) );
}// end getValue()
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
            let recipeRow = $("<tr></tr>");
            // when clicked needs to grab the id of the row and id of the recipe
            recipeRow.append(`<th id='${idName}' scope='row' onclick='setRecipeID(this.id);'>
            <a href='recipe.html'>${data[recipe]["id"]}</a></th>`);
            recipeRow.append(`<td><img src='recipeImages/${data[recipe]["picture"]}' 
            alt='picture of ${data[recipe]["title"]}' style='height: 50px;'</td>`);
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