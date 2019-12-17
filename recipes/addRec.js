function addIngredientsInputs(){

    const i_div = $('#Ingredients');
    const button = $('#i_button');
    let qt = $('#i_quantity').val();

    for(i=0; i<qt; i++){
        i_div.append("<br><label>name</label><input type='text'name='name_"+i+"'/>"
        +"<label>amount</label><input type='text' name='amount_"+i+"' />"
        +" <label>unit</label><input type='text' name='unit_"+i+"' /><br>");
    }

    button.remove();
}// end addIngredientsInputs()


function addInstructionInputs(){

    const s_div = $('#Instructions');
    const s_button = $('#s_button');
    let s_qt = $('#s_quantity').val();

    for(i=0; i<s_qt; i++){
        s_div.append("<br><label>Step</label><input type='text'name='step_"+i+"'/>");
    }
    s_button.remove();

}// end addInstructionInputs()


