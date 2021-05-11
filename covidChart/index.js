/**
 * @author Eduardo Estrada 
 * Source:
 * https://github.com/owid/covid-19-data/tree/master/public/data
 * 06/20/2020
 * 7/2/2020 -source changed json file structure
 * 7/11/2020 - Changed layout, added settings box, using "bind"
 *             to bind "refresh()" to "settings-box".
 *             in "organizeData()" the date string is used to create a 
 *             new Date() object.  This is needed to be able to change the 
 *             days, weeks and months thru the kendo.ui library.
 * 1/10/2021 - custom loading image and message
 * 5/10/2021 - nUsPopulation is now dynamic, already in the imported data by country
 * 5/11/2021 - added kendo grid (table) with cases by state. Data from the CDC API
 */

let chartInfo = {
    total_deaths: 0,
    total_cases: 0,
    nUsPopulation: 0  
};
let aStats = [];
/**
 * Creates a Kendo UI Grid
 * 5/11/2021
 * @param {Array} extdata - array of objects
 */
function createTable(extdata){

    let headers =[
        { field: "Date", title: "Date", format: "{0: yyyy-MM-dd}", width: "50px" },
        { field: "State", title: "State",  width: "50px" },
        { field: "NewCases", title: "New Cases", width: "50px" },
        { field: "NewDeaths", title: "New Deaths", width: "50px" }
    ];
    /**
     * Make the grid
     */
    $("#grid").kendoGrid({
        dataSource: {
            data: extdata,
            schema: {
                model: {
                    fields: {
                        Date: { type: "date" },
                        State: { type: "string" },
                        NewCases: { type: "number" },
                        NewDeaths: { type: "number" }
                    }
                }
            },
            pageSize: 20
        },
        toolbar: ["excel"],
        excel: {
            fileName: "byState.xlsx",
            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
            filterable: true
        },
        height: 550,
        scrollable: true,
        sortable: true,
        filterable: true,
        columnMenu: true,

        pageable: {
            input: true,
            numeric: false
        },
        columns: [{
            title:"New Cases and Deaths By State",
            columns: headers 
        }]
    });
}// end createTable()
/**
 * Adds commas to numbers
 * @param {Number} nNumber 
 * @returns {String}
 */
function addCommasToNumber(nNumber) {
    return nNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}// end addCommasToNumber()
/**
 * Bound to settings box
 */
function refresh() {
    let casesChart = $("#cases-chart").data("kendoChart"),
        casesCategoryAxis = casesChart.options.categoryAxis,
        casesBaseUnitInputs = $("input:radio[name=baseUnit]");
    casesCategoryAxis.baseUnit = casesBaseUnitInputs.filter(":checked").val();
    casesChart.refresh();
    let deathsChart = $("#deaths-chart").data("kendoChart"),
        deathCategoryAxis = deathsChart.options.categoryAxis,
        deathBaseUnitInputs = $("input:radio[name=baseUnit]");
        deathCategoryAxis.baseUnit = deathBaseUnitInputs.filter(":checked").val();
    deathsChart.refresh();
}// end refresh()
/**
 * Adds Value to html div
 * @param {string} sId - html element I.D
 * @param {Number} nValue - value of the gauge
 */
function displayTotalStats(sId, nValue) {
        $( "#" + sId ).text( nValue + "%" );
}// end displayTotalStats()
/**
 * Creates a Kendo UI Chart.  
 * Added parameters to make re-usuable
 * @param {string} id - selector
 * @param {object} oData - data
 * @param {string} sField - property of oData
 * @param {string} sBaseUnits - days weeks months years
 * @param {string} sSeriesColor - css color
 * @param {string} sMainTitle - chart title
 * @param {string} sSeriesType - determines the chart type
 */
function createChart(id, oData, sField, sBaseUnits, sSeriesColor, sMainTitle, sSeriesType){
    $("#" + id).kendoChart({
        dataSource: {
            data: oData
        },
        title: {
            text: sMainTitle
        },
        legend: {
            position: "bottom"
        },
        seriesColors: [sSeriesColor],
        series: [{
            type: sSeriesType,
           // aggregate: "avg",
            field: sField,
            categoryField: "date"
        }],
        categoryAxis: {
            baseUnit: sBaseUnits
        },
        tooltip: {
            visible: true,  
            format: "{0}%",
            template: "#= value #  <br/>New #= series.field #"
        }
    });
}// end createChart()
/**
 * Gets the charts data.
 * 5/11/2021 - removed total_tests and total_tests_per_thousand
 */
function downLoadData() {

    const sDataSource = "https://covid.ourworldindata.org/data/owid-covid-data.json";

    function organizeData(data){
        // 5/10/2021
        chartInfo.nUsPopulation = data.USA.population;
        let total_deaths = 0;
        let total_cases = 0;
        // 5/11/2021
        // let total_tests = 0;
        // let total_tests_per_thousand = 0;

        // cannot use a for each loop , because this is a JSON file
        // using a regular for loop
        for (i = 0; i < Object.keys(data.USA.data).length; i++) {

            // let nTests = data.USA.data[i].total_tests;

            // if(nTests !== undefined || nTests > 0){
            //     // only saves the last one
            //     // this is already cumulative from the source
            //     total_tests = data.USA.data[i].total_tests;
            //     total_tests_per_thousand = data.USA.data[i].total_tests_per_thousand;
            // }
            // if(data.USA.data[i].new_deaths > 0){
                aStats.push({
                    date: new Date(data.USA.data[i].date),
                    cases: data.USA.data[i].new_cases ,
                    deaths: data.USA.data[i].new_deaths
                });
            // }

            // assign totals
            // 12/3/2020
            // had to add this check
            // some of the raw data is "undefined"
            // causes the chart to break
            if ( data.USA.data[i].new_deaths != null){
                total_deaths += data.USA.data[i].new_deaths;
            }   
            if (data.USA.data[i].new_cases != null){
                total_cases += data.USA.data[i].new_cases;
            }
        }// end for data length

        // set the value
        chartInfo.total_deaths = addCommasToNumber(total_deaths);
        chartInfo.total_cases = addCommasToNumber(total_cases);
        // display the charts
        createChart("cases-chart", aStats, "cases", "months","#86b1f7", 
        "Total Cases [" + chartInfo.total_cases + "]", "area");
        createChart("deaths-chart", aStats, "deaths", "months","#2774f2", 
        "Total Deaths [" + chartInfo.total_deaths + "]", "line");
        let nCasesPercent = (total_cases / chartInfo.nUsPopulation * 100).toFixed(2);
        let nDeathsPercent = (total_deaths / chartInfo.nUsPopulation * 100).toFixed(4);
        // 5/11/2021 removed
        // let nTotalTestsPercent = (total_tests / chartInfo.nUsPopulation * 100).toFixed(2);
        // let nTestPerThousPercent = (total_tests_per_thousand / 1000 * 100).toFixed(2);
        // display totals
        displayTotalStats("cases", nCasesPercent);
        displayTotalStats("deaths", nDeathsPercent);
        /*
        // I removed these on 5/10/2021
        // there are more tests than people in the USA.
        // I did not take into account people get tested multiple times.
        displayTotalStats("tests", nTotalTestsPercent);
        displayTotalStats("usaTesting", nTestPerThousPercent);
        */
        // remove loading indicator
        kendo.ui.progress($(".chart-loading"), false);
        // remove loading text
        $("div.chart-loading").attr("style","display: none;");
    }// end organizeData()
    $.ajax({
        url: sDataSource,
    })
    .done(organizeData)
    .fail(function() {
        alert( "Doesn't look like anything to me.");
        // remove loading indicator
        kendo.ui.progress($(".chart-loading"), false);
        // remove loading text
        $("div.chart-loading").attr("style","display: none;");
    });
}// end downLoadData

/**
 * Will fetch the data from the CDC JSON File
 */
function getTableData(){

    let tableData = [];

    function organizeData(data){
        for (let i = 0; i < Object.keys(data).length; i++) {
            let sDate = data[i].submission_date;
            let sSate = data[i].state;
            let sNewCase = data[i].new_case;
            let sNewDeath = data[i].new_death;

            tableData.push({
                "Date": new Date(sDate),
                "State": sSate,
                "NewCases": Number(sNewCase),
                "NewDeaths": Number(sNewDeath)
            });
        }// end for loop
        // go make the table
        createTable(tableData)
    }// end organizeData()

    $.ajax({
        url: "https://data.cdc.gov/resource/9mfq-cb36.json",
    })
    .done(organizeData)
    .fail(function() {
        alert( "Doesn't look like anything to me.");
        console.error("There was a problem fetching the table data");
        // remove loading indicator
        kendo.ui.progress($(".chart-loading"), false);
        // remove loading text
        $("div.chart-loading").attr("style","display: none;");
    });
}// end getTableData()
/**
 * Start the sequence
 */
$( document ).ready(function() {
    // display loading indicator  cases-chart  chart-loading
    kendo.ui.progress($(".chart-loading"), true);
    // 5/11/2021 New Feature
    getTableData();
    downLoadData(); 
});
/**
 * Jquery bind("event", function)
 */
$(".settings-box").bind("change", refresh);