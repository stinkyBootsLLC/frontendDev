// put all globals inside here
var recipes = {
    counter: 1,
    stepLimit: 25
};
/**
 * Adds another step to the form
 * @param {String} divName 
 */
function addStep(divName){
    let instDiv = $("#" + divName);
    if (recipes.counter == recipes.stepLimit)  {
        alert("You have reached the limit of adding " + recipes.counter + " inputs");
    } else {
        instDiv.append(`<label for="step_${recipes.counter}">Step&nbsp;</label><input id="step_${recipes.counter}" type="text" 
        name="step_${recipes.counter}" pattern="^[^<>%$]*$" title="Letters and Numbers only" 
        aria-label="recipe step ${recipes.counter + 1}" required=""></input><br>`);
        recipes.counter++; 
    }               
}// end addStep()











/**
 * Only allow the "space" key to call 
 * the populateUnitsValues() function.
 * This of for accessibility only
 * @param {object} event 
 * @param {string} id 
 */
function keyHandler(event, id){
    // console.log(event);
    let oElement = $("#" + id);
    if(event.code === "Space"){
        oElement.focus();
        console.log("space pressed");
        populateUnitsValues(id);
    }else{
        event.preventDefault();
        oElement.focus();
    }
}// end keyHandler()

/**
 * Appends Ingredients based on user selected quantity
 */
function addIngredientsInputs(){
    const ingredientsDiv = $('#Ingredients');
    const ingredientsBtn = $('#i_button');
    let ingredientsQty = $('#i_quantity').val();
    for(index=0; index<ingredientsQty; index++){
        let nCount = index + 1;
        ingredientsDiv.append(`<br><label for='name_${index}'>name</label>
        <input id='name_${index}' type='text'name='name_${index}' 
        pattern='^[^<>%$]*$' title='Letters and Numbers only' aria-label='ingredient name ${nCount}' required />
        <label for='amount_${index}'>amount</label><input id='amount_${index}' type='text' name='amount_${index}' 
        pattern='^[^<>%$]*$' title='Numbers only' aria-label='ingredient amount ${nCount}' required />
        <label for='unit_${index}'>unit</label><select id='unit_${index}' name='unit_${index}' 
        aria-label='select ingredient ${nCount} unit. press the space bar' onclick='populateUnitsValues(this.id);'
        aria-pressed='false' onkeypress='keyHandler(event, this.id);'></select>`);
    }// end for
    ingredientsBtn.remove();
}// end addIngredientsInputs()

/**
 * Appends Steps based on user selected quantity
 */
// function addInstructionInputs(){
//     const stepDiv = $('#Instructions');
//     const stepBtn = $('#s_button');
//     let stepQuantity = $('#s_quantity').val();
//     for(index=0; index<stepQuantity; index++){
//         let nCount = index + 1;
//         stepDiv.append(`<br><label for='step_${index}'>Step</label><input id='step_${index}' 
//         type='text'name='step_${index}' pattern='^[^<>%$]*$' title='Letters and Numbers only' 
//         aria-label='recipe step ${nCount}' required />`);
//     }// end for
//     stepBtn.remove();
// }// end addInstructionInputs()

/**
 * Populates the "units" options
 * @param {String} elementID 
 */
function populateUnitsValues(elementID){
    // select object
    let select = $( '#' + elementID);
    // array of measurement units
    const units = ["Each","Tsp","Tbsp","Ounces" ,"Gills","Cup","pound",
                    "Pint","Quart","Drop","Peck",
                    "Bushel","Bag"," "];
    // loop thru array and append option
    for (index = 0; index < units.length; index++) { 
        select.append(new Option(units[index], units[index]));
        // console.log(units[index]); 
    }// end for 
    // remove the attribute or it keeps populating
    select.removeAttr("onclick");
}// end populateUnitsValues()
/**
 * Validate Qty is greater than zero
 * @param {HTMLelement} oButton 
 */
function validate(oButton){
    if(oButton.id === "i_button"){
        if(document.getElementById("i_quantity").value > 0){
            console.log("good ingredient count"); 
            addIngredientsInputs();
        }else{
            alert("Ingredients QTY must be > 0");
        }
    }else{
        // its the instructions button
        if(document.getElementById("s_quantity").value > 0){
            addInstructionInputs();
        }else{
            alert("Instructions QTY must be > 0");
        }
    }
} // end validate(oButton)


/**
 * Sanitize user input
 */
function validateForm(){
    
    let isValid = true;
    let aFormValues = $("#rec-form").serializeArray();
 
    $(aFormValues).each(function(i, field){
        if(field.value.match("^[^<>%$]*$")){
            // all good 
        } else {
            // the only way we end up in here is IF the form patterns have 
            // been broken by someone
            isValid = false;
            //console.log( field.value);
            $( "[name=" +  field.name + "]" ).addClass( "not-valid" );
            alert("stop fucking with the form");
            document.getElementById("submit").disabled = true;
            // window.history.back();
        }
        // dataObj[field.name] = field.value;
    });

    return isValid;

}// end validateForm()


$(document).ready(function(){
    /**
     * Creates a unique record ID.
     * YYYY MM DD RN MSEc
     * 2020 12 27 74 711
     */
    let oToday = new Date();
    let nYear = oToday.getFullYear();
    let nDay = oToday.getDate();  // day
    let nMonth = oToday.getMonth() + 1;
    let nMillSec = oToday.getMilliseconds();
    let nRand = Math.floor((Math.random() * 100) + 1);
    let sRecordID = `${nYear}${nMonth}${nDay}${nRand}${nMillSec}`;
    document.getElementById("record-id").value = sRecordID;
});
