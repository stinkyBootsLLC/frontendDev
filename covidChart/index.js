/**
 * Eduardo Estrada 
 * Source:
 * https://github.com/owid/covid-19-data/tree/master/public/data
 * 06/20/2020
 */

let chartInfo = {
    dates: [],
    newDeaths: [],
    newCases:[],
    total_deaths: 0,
    total_cases: 0,
};
/**
 * Creates a Kendo UI Chart.  Added parameters to make re-usuable
 * @param {string} sID 
 * @param {string} sMainTitle 
 * @param {string} sSeriesType 
 * @param {string} sSeriesName 
 * @param {string} sSeriesColor 
 * @param {array} aSeriesData 
 * @param {array} aCategories 
 */
function createChart(sID, sMainTitle, sSeriesType, sSeriesName, sSeriesColor, aSeriesData, aCategories) {
 
    $("#" + sID).kendoChart({
        title: {
            text: sMainTitle
        },
        legend: {
            position: "bottom"
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
           // type: "area",
            style: "smooth"
        },
        seriesColors: [sSeriesColor],
        series: [{
            type: sSeriesType,
            name: sSeriesName,
            data: aSeriesData
        },],
        valueAxis: {
            labels: {
                format: "N0"
            },
            line: {
                visible: false
            },
            axisCrossingValue: -10
        },
        categoryAxis: {
            categories: aCategories,
            majorGridLines: {
                visible: false
            },
            crosshair: {
                visible: true
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
 * Gets the charts data.
 */
function getData() {
   
    const sDataSource = "https://covid.ourworldindata.org/data/owid-covid-data.json";

    function organizeData(data){
        //console.log(data.USA);
        let total_deaths = 0;
        let total_cases = 0;
        // cannot use a for each loop , because this is a JSON file
        // using a regular for loop
        for (i = 0; i < Object.keys(data.USA).length; i++) { 
            if(data.USA[i].new_deaths > 300){
                chartInfo.dates.push( data.USA[i].date.substring(5) );
                chartInfo.newDeaths.push( data.USA[i].new_deaths );
                chartInfo.newCases.push( data.USA[i].new_cases );
            }
            // assign totals
            total_deaths += data.USA[i].new_deaths;
            total_cases += data.USA[i].new_cases;
        }// end for data length
        // console.log(total_cases);
        // set the value
        chartInfo.total_deaths = total_deaths;
        //console.log(chartInfo.total_deaths);
        chartInfo.total_cases = total_cases
        // display the charts
        createChart("cases-chart", "Total Cases [" + chartInfo.total_cases + "]", "area", 
        "Cases", "#86b1f7", chartInfo.newCases, chartInfo.dates); 
        createChart("deaths-chart", "Total Deaths [" + chartInfo.total_deaths + "]", "line", 
        "Deaths", "#2774f2", chartInfo.newDeaths, chartInfo.dates); 
    }// end organizeData()
    $.ajax({
        url: sDataSource,
    }).done(organizeData);
}// end getdata

/**
 * Start the sequence
 */
$( document ).ready(function() {
    getData();
});