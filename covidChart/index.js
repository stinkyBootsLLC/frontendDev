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
 */

let chartInfo = {
    total_deaths: 0,
    total_cases: 0,
};
let oStats = [];

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
    $( "#" + sId ).html( nValue + "%" );
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
 */
function downLoadData() {
    const sDataSource = "https://covid.ourworldindata.org/data/owid-covid-data.json";
    function organizeData(data){
        let total_deaths = 0;
        let total_cases = 0;
        // cannot use a for each loop , because this is a JSON file
        // using a regular for loop
        for (i = 0; i < Object.keys(data.USA.data).length; i++) {
            // console.log(data.USA.data[i].new_deaths);
            if(data.USA.data[i].new_deaths > 0){
                oStats.push({
                    date: new Date(data.USA.data[i].date),
                    cases: data.USA.data[i].new_cases ,
                    deaths: data.USA.data[i].new_deaths
                });
            }
            // assign totals
            total_deaths += data.USA.data[i].new_deaths;
            total_cases += data.USA.data[i].new_cases;
        }// end for data length
        // set the value
        chartInfo.total_deaths = total_deaths;
        //console.log(chartInfo.total_deaths);
        chartInfo.total_cases = total_cases;
        // display the charts
        createChart("cases-chart", oStats, "cases", "months","#86b1f7", 
        "Total Cases [" + chartInfo.total_cases + "]", "area");
        createChart("deaths-chart", oStats, "deaths", "months","#2774f2", 
        "Total Deaths [" + chartInfo.total_deaths + "]", "line");
        let nCasesPercent = (total_cases / 3282000000 * 100).toFixed(2);
        let nCasesDeaths = (total_deaths / 3282000000 * 100).toFixed(4);
        // display totals
        displayTotalStats("cases", nCasesPercent);
        displayTotalStats("deaths", nCasesDeaths);
        // remove loading indicator
        kendo.ui.progress($(".chart-loading"), false);
    }// end organizeData()
    $.ajax({
        url: sDataSource,
    }).done(organizeData);
}// end getdata

/**
 * Start the sequence
 */
$( document ).ready(function() {
    // display loading indicator
    kendo.ui.progress($(".chart-loading"), true);
    downLoadData();
});
$(".settings-box").bind("change", refresh);

//chart-area