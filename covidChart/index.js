/**
 * @author Eduardo Estrada 
 * Source:
 * https://github.com/owid/covid-19-data/tree/master/public/data
 * 06/20/2020
 * 7/2/2020 -source changed json file structure
 */

let chartInfo = {
    dates: [],
    newDeaths: [],
    newCases:[],
    total_deaths: 0,
    total_cases: 0,
};
/**
 * Creates Arc Gauges
 * @param {string} sId - html element I.D
 * @param {Number} nValue - value of the gauge
 */
function createGauge(sId, nValue) {
    $("#" + sId).kendoArcGauge({
        color: "#67a9f5",
        value: nValue,
        centerTemplate: '#: value #%'
       
    });
}

/**
 * Creates a Kendo UI Chart.  
 * Added parameters to make re-usuable
 * @param {string} sID - html element I.D
 * @param {string} sMainTitle - Title of the Chart
 * @param {string} sSeriesType - Chart Type
 * @param {string} sSeriesName - Chart Series name
 * @param {string} sSeriesColor - Chart Series color
 * @param {array} aSeriesData - Chart Series data
 * @param {array} aCategories - Chart categories (x axis)
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
            template: " #= category#-20: <br/> #= value #  #= series.name #"
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
                chartInfo.dates.push( data.USA.data[i].date.substring(5) );
                chartInfo.newDeaths.push( data.USA.data[i].new_deaths );
                chartInfo.newCases.push( data.USA.data[i].new_cases );
            }
            // assign totals
            total_deaths += data.USA.data[i].new_deaths;
            total_cases += data.USA.data[i].new_cases;
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
        let nCasesPercent = (total_cases / 3282000000 * 100).toFixed(2);
        let nCasesDeaths = (total_deaths / 3282000000 * 100).toFixed(4);
        // display gauges
        createGauge("cases", nCasesPercent);
        createGauge("deaths", nCasesDeaths);
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