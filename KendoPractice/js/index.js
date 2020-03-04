


/**
 * Returns array of headers
 * @param {array} returnedTarget 
 * @return {array} headers
 */
function getHeaders(returnedTarget){
    let headers = [];
    for (var key in returnedTarget[1]) {
        if (returnedTarget[1].hasOwnProperty(key)) {
            // console.log(key + " -> " + returnedTarget[1][key]);
            headers.push(key);
        }
    }// end for
    return headers

}// end getHeaders()


/**
 * Displays Kendo Grid to div element.
 * @param {JSON Object} extdata 
 */
function displayTable(extdata){
    // declare local variables
    let data = [];
    
    // copy only the required data to empty data array
    const returnedTarget = Object.assign(data, extdata["Major Sector Productivity and Costs"]);
    // get headers
    let headers = getHeaders(returnedTarget);

    // get the title
    let titleArr = Object.keys(extdata);
    let titleString = titleArr[0].toString();

    // now using the kendo lib
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            fileName: titleString + ".xlsx",
            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
            filterable: true
        },
        sortable: true,
        // pageable: true,
        // groupable: true,
        filterable: true,
        columnMenu: true, //this one
        // reorderable: true,
        // resizable: true,
        columns: [
            {
                title: titleString + " (output per hour)",// "title",
                columns: headers // working array 
                // [
                //     { field: headers[0], filterable: true},
                //     { field: headers[1], filterable: true},
                //     { field: headers[2], filterable: true},
                //     { field: headers[3], filterable: true }
                   
                // ]
            }
        ],
        editable: false,
        // this must be an array 
        dataSource:  data, // fields have to match
        height: 400
    });
}// end displayTable()

function createChart(extdata) {

    // declare local variables
    let data = [];
    // copy only the required data to empty data array
    const returnedTarget = Object.assign(data, extdata["Major Sector Productivity and Costs"]);
    // get the title
    let titleArr = Object.keys(extdata);
    let titleString = titleArr[0].toString();
    // get series names
    let seriesNames = getHeaders(returnedTarget);
    console.log(returnedTarget);

    // var nameArray = returnedTarget.map(function (el) { return parseFloat(el.Qtr1) });
    

    let series1 = returnedTarget.map(function (el) { return parseFloat(el.Qtr1) });
    // console.log(series1);
    let series2 = returnedTarget.map(function (el) { return parseFloat(el.Qtr2) });
    // console.log(series2);
    let series3 = returnedTarget.map(function (el) { return parseFloat(el.Qtr3) });
    // console.log(series3);
    let series4 = returnedTarget.map(function (el) { return parseFloat(el.Qtr4) });
    // console.log(series4);

    let xLabels = returnedTarget.map(function (el) { return parseInt(el.Year) });
    console.log(xLabels);

   




     




    $("#chart").kendoChart({
        title: {
            text: titleString + " (output per hour)"

        },
        legend: {
            position: "bottom"
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            type: "line",
            style: "smooth",
            opacity: 0.5
        },
        series: [{
            name: seriesNames[1], // string

           
            color: "#236AB9",
                
           




            data: series1 // needs to be an array
        },{
            name: seriesNames[2], // string

            color: "#FC7307",




            data: series2 // needs to be an array
        },{
            name: seriesNames[3], // string

            color: "#B85B14",





            data: series3 // needs to be an array
        },{
            name: seriesNames[4], // string

            color: "#341C09",
           


            data: series4 // needs to be an array
        }],
        valueAxis: {
            labels: {
                format: "{0}"
            },
            line: {
                visible: false
            },
            axisCrossingValue: -10
        },
        categoryAxis: {
            categories: xLabels,//[2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            majorGridLines: {
                visible: false
            },
            labels: {
                rotation: "auto"
            }
        },
        tooltip: {
            visible: true,
            format: "{0}%",
            template: "#= series.name #: #= value #"
        }
    });
}

function getData(url, component){
    $.ajax({
        url: url, 
        contentType: "application/json",
        dataType: "json",
        success: function(result){
            // assync methods CANNOT return 
            // call the function
            
            switch(component) {
                case "grid":
                    displayTable(result);
                  break;
                case "line-chart":
                    createChart(result);
                  break;
                default:
                  // code block
              }


        },
        error: function(e){
            alert("Unable to fetch external data "+ e.message + " - error");
        }
    });
}// end getData()




$( document ).ready(function() {
    getData("http://localhost/KendoPractice/dataSource/qryLaborProd.json","grid");
    getData("http://localhost/KendoPractice/dataSource/qryLaborProd.json","line-chart");
});