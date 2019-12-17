const mainDivElement = $("#test");
const recipes = 'recipes.json';

fetch(recipes)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // loop thru the recipes in the data obj
    for (recipe in data) {
      // create id name for the element
      idName = "recipe" + recipe;
      // create the div
      let recipeDiv = $("<div></div>");
      recipeDiv.attr('id', idName);
      recipeDiv.attr('class', 'recipe');
      // add to div
      recipeDiv.append( data[recipe]["id"] + "<br>") ;
      recipeDiv.append("<h2>" + data[recipe]["title"] + "</h2>") ;
      recipeDiv.append("<p>" + data[recipe]["description"] + "</p>") ;
      // create variables 
      let ingredients = data[recipe]["ingredients"];
      let instructions = data[recipe]["directions"];
      // add to div
      recipeDiv.append("<h3>Ingredients:<h3>");
      // loop thru the ingredients
      for(item in ingredients){
        // create the list of ingredients
        recipeDiv.append("<li>" + ingredients[item]["name"] + " - "
        + ingredients[item]["amount"] + " " + ingredients[item]["unit"] + "</li>");
      }// end for(item in ingredients)
      // add header
      recipeDiv.append("<h3>Directions:<h3>");
      // loop thru the instructions
      for(step in instructions){
        // create the list of instructions
        recipeDiv.append("<li>" + instructions[step]["Step"] + "</li>") ;
      }// end for(step in instructions)
      // add seperator
      recipeDiv.append("<br><hr><br>") ;
      // add as a child to the main div
      mainDivElement.append(recipeDiv);
    }// end for (recipe in data)
  })
  .catch(err => {
    // Do something for an error here
    console.log('unable to fetch recipes.json ' + err);
  })