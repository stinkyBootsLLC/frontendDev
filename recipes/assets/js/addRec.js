/**
 * Appends Ingredients based on user selected quantity
 */
function addIngredientsInputs(){
    const ingredientsDiv = $('#Ingredients');
    const ingredientsBtn = $('#i_button');
    let ingredientsQty = $('#i_quantity').val();
    for(index=0; index<ingredientsQty; index++){
        ingredientsDiv.append(`<br><label>name</label><input type='text'name='name_${index}' 
        pattern='^[^<>%$]*$' title='Letters and Numbers only' required /><label>amount</label><input 
        type='text' name='amount_${index}' pattern='^[^<>%$]*$' title='Numbers only' required /> 
        <label>unit</label><select id='unit_${index}' name='unit_${index}' 
        onclick='populateUnitsValues(this.id);'></select>`);
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
        stepDiv.append(`<br><label>Step</label><input type='text'name='step_${index}' 
        pattern='^[^<>%$]*$' title='Letters and Numbers only' required  />`);
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
    const units = ["each","tsp","Tbsp","ounces" ,"gills","cups","pounds",
                    "pints","quarts","cups","pints","quarts","pecks",
                    "bushel","bag"," "];
    // loop thru array and append option
    for (index = 0; index < units.length; index++) { 
        select.append(new Option(units[index], units[index]));
        console.log(units[index]); 
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
            console.log( field.value);
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
     * Creates a unique record ID
     */
    let oToday = new Date();
    let nYear = oToday.getFullYear();
    let nDay = oToday.getDate();  // day
    let nMonth = oToday.getMonth();
    let nMillSec = oToday.getMilliseconds();
    let nRand = Math.floor((Math.random() * 100) + 1);
    let sRecordID = `${nYear}${nMonth}${nDay}${nRand}${nMillSec}`;
    document.getElementById("record-id").value = sRecordID;


    // validateForm();

    // $( "form" ).on( "submit", function( event ) {
    //     event.preventDefault();
    //     validateForm();

    //     //console.log( $( this ).serialize() );
    // });




});
