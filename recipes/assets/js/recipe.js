/**
 * Display just one recipe.
 * Find the recipe id in the JSON file.
 * 02 Jan 2021 - add logic if record ID is 
 * not found, display an error.
 */
function displayRecipe(){
    const mainDivElement = $("#main-div");
    const recipes = 'assets/db/recipes.json';
    // Get saved data from sessionStorage
    let recipeID = sessionStorage.getItem('recipe').trim();
    fetch(recipes).then(response => {
        return response.json()
    }).then(data => {
        let isFound = false;
        let recipeDiv = $("<div></div>");
        // loop thru the recipes in the data obj
        for (recipe in data) {
            
            if(data[recipe]["id"] === recipeID){
                isFound = true;
                // create id name for the element
                idName = "recipe-" + recipe;
                recipeDiv.attr('id', idName);
                recipeDiv.attr('class', 'card bg-light mb-5');
                recipeDiv.attr('style', 'max-width: 36rem;');
                // add to div
                let recipeHeaderDiv = $("<div tabindex='0'></div>");
                recipeHeaderDiv.attr('class','card-header');
                recipeDiv.append(recipeHeaderDiv);
                recipeHeaderDiv.append(`<i class='fas fa-utensils' style='float: left;'></i>
                <h1 style='font-size: 16pt; float: left; margin-left: 0.5em;'>${data[recipe]["title"]}</h1>`);
                let recipeBodyDiv = $("<div tabindex='0'></div>");
                recipeBodyDiv.attr('class','card-body');
                recipeDiv.append(recipeBodyDiv);
                recipeBodyDiv.append( `<img class='card-img-top' src='recipeImages/${data[recipe]["picture"]}' 
                                            alt='picture of ${data[recipe]["title"]}' style='height: 500px;'> ` );
                recipeBodyDiv.append(`<p class='card-text' tabindex='0'>Category: ${data[recipe]["Category"]}</p>`);
                recipeBodyDiv.append(`<p class='card-text' tabindex='0'>${data[recipe]["description"]}</p>`);
                // create variables 
                let ingredients = data[recipe]["ingredients"];
                let instructions = data[recipe]["directions"];
                // add to div
                recipeBodyDiv.append("<p tabindex='0'>Ingredients:<p>");
                let ingrListDiv = $("<ul id='ingr_list'></ul>");
                let stepListDiv = $("<ul id='step_list'></ul>");
                recipeBodyDiv.append(ingrListDiv);
                // loop thru the ingredients
                for(item in ingredients){
                    // create the list of ingredients
                    ingrListDiv.append(`<li tabindex='0'>${ingredients[item]["name"]} - ${ingredients[item]["amount"]} 
                                        ${ingredients[item]["unit"]}</li>`);
                }// end for(item in ingredients)
                // add header
                recipeBodyDiv.append("<br><p tabindex='0'>Directions:<p>");
                recipeBodyDiv.append(stepListDiv);
                // loop thru the instructions
                for(step in instructions){
                    // create the list of instructions
                    stepListDiv.append(`<li tabindex='0'>${instructions[step]["Step"]}</li>`) ;
                }// end for(step in instructions)
                // add as a child to the main div
                mainDivElement.append(recipeDiv);
            }// end if match
        }// end for (recipe in data)
        // if no record id is found (02 Jan 21)
        if(!isFound){
            // display error card
            recipeDiv.attr('id', "not-found");
            recipeDiv.attr('class', 'card bg-light mb-5');
            recipeDiv.attr('style', 'max-width: 36rem;');
            // add to div
            let recipeHeaderDiv = $("<div tabindex='0'></div>");
            recipeHeaderDiv.attr('class','card-header');
            recipeDiv.append(recipeHeaderDiv);
            recipeHeaderDiv.append(`<i class='fas fa-utensils' style='float: left;'></i>
            <h1 style='font-size: 16pt; float: left; margin-left: 0.5em;'>Not Found</h1>`);
            let recipeBodyDiv = $("<div tabindex='0'></div>");
            recipeBodyDiv.attr('class','card-body');
            recipeDiv.append(recipeBodyDiv);
            recipeBodyDiv.append( `<img class='card-img-top' src='recipeImages/image-not-found.jpg' 
                                        alt='' style='height: 500px;'> ` );
            recipeBodyDiv.append(`<p class='card-text' tabindex='0'>Category: Not found</p>`);
            recipeBodyDiv.append(`<p class='card-text' tabindex='0'>It doesn't look like anything to me</p>`);
            recipeBodyDiv.append("<br><p tabindex='0'>Directions: not found<p>");
            // add as a child to the main div
            mainDivElement.append(recipeDiv);
        }// end if(!isFound)

    }).catch(err => {
        // Do something for an error here
        alert('unable to fetch recipes.json ' + err);
    });
}// end displayRecipe()


$( document ).ready(function() {
    displayRecipe();
}); 