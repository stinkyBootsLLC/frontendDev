// creates a more user friendly view of all 
// the recipes in the json file

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
      let recipeHeaderDiv = $("<div></div>");
      recipeHeaderDiv.attr('class','card-header');
      recipeDiv.append(recipeHeaderDiv);
      recipeHeaderDiv.append(`<i class='fas fa-utensils'></i>&nbsp;&nbsp;${data[recipe]["title"]}`);
      let recipeBodyDiv = $("<div></div>");
      recipeBodyDiv.attr('class','card-body');
      recipeDiv.append(recipeBodyDiv);
      recipeBodyDiv.append( `<img class='card-img-top' src='recipeImages/${data[recipe]["picture"]}' 
                                alt='${data[recipe]["picture"]}' style='height: 500px;'> ` );
      recipeBodyDiv.append(`<p class='card-text'>Category: ${data[recipe]["Category"]}</p>`);
      recipeBodyDiv.append(`<p class='card-text'>${data[recipe]["description"]}</p>`);
      // create variables 
      let ingredients = data[recipe]["ingredients"];
      let instructions = data[recipe]["directions"];
      // add to div
      recipeBodyDiv.append("<p>Ingredients:<p>");
      // loop thru the ingredients
      for(item in ingredients){
        // create the list of ingredients
        recipeBodyDiv.append(`<li>${ingredients[item]["name"]} - ${ingredients[item]["amount"]} 
                              ${ingredients[item]["unit"]}</li>`);
      }// end for(item in ingredients)
      // add header
      recipeBodyDiv.append("<br><p>Directions:<p>");
      // loop thru the instructions
      for(step in instructions){
        // create the list of instructions
        recipeBodyDiv.append(`<li>${instructions[step]["Step"]}</li>`) ;
      }// end for(step in instructions)
      // add as a child to the main div
      mainDivElement.append(recipeDiv);
    }// end for (recipe in data)
  })
  .catch(err => {
    // Do something for an error here
    console.log('unable to fetch recipes.json ' + err);
  })
