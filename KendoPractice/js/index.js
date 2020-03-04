/**
 * Main Script to display two Kendon components. (grid, chart).
 * Everything is wrapped in functions to avoid global variables.
 * Global variables  may lead to a maintenance issue. 
 * @author Eduardo Estrada
 * @date 3-4-2020
 */
/**
 * Returns array of headers
 * @param {array} returnedTarget 
 * @return {array} headers
 */
function getHeaders(returnedTarget){
    let headers = [];
    for (var key in returnedTarget[1]) {
        if (returnedTarget[1].hasOwnProperty(key)) {
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
    /** Organize the data */
    // declare local variables
    let dataArray = [];
    // copy only the required data to empty data array
    const returnedTarget = Object.assign(dataArray, extdata["Major Sector Productivity and Costs"]);
    // get headers
    let headers = getHeaders(returnedTarget);
    // get the title
    let titleArr = Object.keys(extdata);
    let titleString = titleArr[0].toString();
    /** End - Organize the data */
    // now using the kendo lib
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            fileName: titleString + ".xlsx",
            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
            filterable: true
        },
        sortable: true,
        filterable: true,
        columnMenu: true, 
        columns: [
            {
                title: titleString + " (output per hour)",
                /**
                 * Example of what can be in the array
                 * Objects of properties
                 * [ { field: headers[0], filterable: true} ] 
                 */
                columns: headers 
            }
        ],
        editable: false,
        // this must be an array 
        dataSource:  dataArray, // fields have to match
        height: 400
    });
}// end displayTable()
/**
 * Displays Kendo line Chart to div element.
 * @param {JSON Object} extdata 
 */
function createChart(extdata) {
    /** Organize the data */
    // declare local variables
    let dataArray = [];
    // copy only the required data to empty data array
    const returnedTarget =  Object.assign(dataArray, extdata["Major Sector Productivity and Costs"]);
    // get the title
    let titleArr = Object.keys(extdata);
    let titleString = titleArr[0].toString();
    // get series names
    let seriesNames = getHeaders(returnedTarget);
    // get series values
    let series1 = returnedTarget.map(function (el) { return parseFloat(el.Qtr1) });
    let series2 = returnedTarget.map(function (el) { return parseFloat(el.Qtr2) });
    let series3 = returnedTarget.map(function (el) { return parseFloat(el.Qtr3) });
    let series4 = returnedTarget.map(function (el) { return parseFloat(el.Qtr4) });
    // Get only the years for x axis labels
    let xAxisLabels = dataArray.map(function (el) { return parseInt(el.Year) });
    /** End - Organize the data */
    // Kendo Library
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
            categories: xAxisLabels,
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
}// end createChart()
/**
 * Gets the data source and calls a function.
 * JQuery ajax method, Performs an asynchronous HTTP (Ajax) request.
 * @param {String} url 
 * @param {String} component 
 */
function getData(url, component){
    /**
     * jQuery.ajax( url [, settings ] )
     */
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
              }// end switch
        },
        error: function(error){
            alert("Unable to fetch external JSON data "+ error.message + " " + component);
        }
    });
}// end getData()
/**
 * Start the sequence
 */
$( document ).ready(function() {
    getData("http://localhost/KendoPractice/dataSource/qryLaborProd.json","grid");
    getData("http://localhost/KendoPractice/dataSource/qryLaborProd.json","line-chart");
});