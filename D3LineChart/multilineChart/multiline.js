// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the 1st line
var valueline = d3.line()
    .x(function(d) { return x(d.day); })
    .y(function(d) { return y(d.temp17); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(d.day); })
    .y(function(d) { return y(d.temp18); });

// define the 3rd line
// var valueline3 = d3.line()
//     .x(function(d) { return x(d.day); })
//     .y(function(d) { return y(d.temp19); });    

// append the svg obgect to the div class="chart" of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("tempData2.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.day = +d.day;
    d.temp17 = +d.temp17;
    d.temp18 = +d.temp18;
    //d.temp19 = +d.temp19;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.day; }));
  y.domain([0, d3.max(data, function(d) {
	  return Math.max(d.temp17, d.temp18); })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line2")
      //.style("stroke", "red")
      .attr("d", valueline2);



    // Add the valueline3 path.
    // svg.append("path")
    //     .data([data])
    //     .attr("class", "line")
    //     .style("stroke", "red")
    //     .attr("d", valueline3);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});