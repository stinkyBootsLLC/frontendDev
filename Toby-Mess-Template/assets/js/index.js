function populateCards(sURL){
    const mainElement = $("#main-area");

    // console.log(mainElement);

    

    
    function addCards(cards){
        // the returned response
        const cardsData = cards;
        // console.log(cardsData);
        let count = 0; 

        $.each(cardsData.cards, function(index, element) {

           
            // i need to count every two records 
            count++;
            
            
            console.log(count);

            let sTitle = element.title;
            let sDescription = element.description;
            let sTitle2 = element.title2;
            let sDescription2 = element.description2;            

            let oCurrentRow; 
            if(count !== 3){

                mainElement.append("<div id='row_"+index+"'class='row' style='margin: 1em'> ");
                let sRow = "#row_" + index;
                oCurrentRow = $("#row_" + index);

                console.log(oCurrentRow);
                if(sRow === sRow){
                    console.log(sRow);

                oCurrentRow.append(
                "<div class='column'>"
                +"<div class='card'><h1>"+sTitle+"</h1><p>"+sDescription+"</p></div>");
                }


                oCurrentRow.append(
                "<div class='column'>"
                +"<div class='card'><h1>"+sTitle2+"</h1><p>"+sDescription2+"</p></div>");
                
                
               
            }
            


            if(count === 2){
                // then reset the count
                count = 0;
                console.log(count);
                oCurrentRow.append("</div>");
            }
            




        });// end foreach











    }// end addArticles()
        
    // JQuery Ajax
    $.ajax({
        url: sURL,
    }).done(addCards);

}// end setArticles()



(function () {
    const sURL = "http://localhost/Toby-Mess-Template/db/data.json";

    populateCards(sURL);

    

    
})();