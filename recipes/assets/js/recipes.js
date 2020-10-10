// creates a more user friendly view of all 
// the recipes in the json file
// 10/10/20 - added accessibility tabindex

const mainDivElement = $("#main-div");
const recipes = 'assets/db/recipes.json';

fetch(recipes)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // loop thru the recipes in the data obj
    for (recipe in data) {
      // create id name for the element
      idName = "recipe-" + recipe;
      // create the div
      // <div class="card bg-light mb-3" style="max-width: 36rem;">
      let recipeDiv = $("<div></div>");
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
    }// end for (recipe in data)
  })
  .catch(err => {
    // Do something for an error here
    console.log('unable to fetch recipes.json ' + err);
  })
