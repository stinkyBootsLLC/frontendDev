/**
 * Appends Ingredients based on user selected quantity
 */
function addIngredientsInputs(){
    const ingredientsDiv = $('#Ingredients');
    const ingredientsBtn = $('#i_button');
    let ingredientsQty = $('#i_quantity').val();
    for(index=0; index<ingredientsQty; index++){
        ingredientsDiv.append("<br><label>name</label><input type='text'name='name_"+ index +"'/>"
        +"<label>amount</label><input type='text' name='amount_"+ index +"' />"
        +" <label>unit</label><select id='unit_"+ index +"' name='unit_" + index 
        + "' onclick='populateUnitsValues(this.id);'></select>");
    }// end for
    ingredientsBtn.remove();
}// end addIngredientsInputs()

/**
 * Appends Steps based on user selected quantity
 */
function addInstructionInputs(){
    const stepDiv = $('#Instructions');
    const stepBtn = $('#s_button');
    let stepQuantity = $('#s_quantity').val();
    for(index=0; index<stepQuantity; index++){
        stepDiv.append("<br><label>Step</label><input type='text'name='step_"+index+"'/>");
    }// end for
    stepBtn.remove();
}// end addInstructionInputs()

/**
 * Populates the "units" options
 * @param {String} elementID 
 */
function populateUnitsValues(elementID){
    // select object
    let select = $( '#' + elementID);
    // array of measurement units
    const units = ["teaspoons","tablespoons","ounces" ,"gills","cups",
                    "pints","quarts","cups","pints","quarts","pecks",
                    "bushel"];
    // loop thru array and append option
    for (index = 0; index < units.length; index++) { 
        select.append(new Option(units[index], units[index]));
        console.log(units[index]); 
    }// end for 
    // remove the attribute or it keeps populating
    select.removeAttr("onclick");
}// end populateUnitsValues()