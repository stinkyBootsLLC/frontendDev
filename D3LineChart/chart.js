var margin = { top: 30, right: 132, bottom: 30, left: 50 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    

    var parseDate = d3.time.format("%m/%d/%Y").parse,
        bisectDate = d3.bisector(function(d) { return d.date; }).left,
        formatValue = d3.format(","),
        dateFormatter = d3.time.format("%Y");// format the displayed date

    var x = d3.time.scale()
            .range([0, width]);

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(dateFormatter);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format("s"))

    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.victims); });

    var svg = d3.select("#chart-display").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select("#chart-display").append("div")
        .attr("class", "myTooltip")
        .style("display", "none");


    d3.csv("data.csv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.victims = +d.total_victims;
        });

        data.sort(function(a, b) {
            return a.date - b.date;
        });

        x.domain([data[0].date, data[data.length - 1].date]);//
        y.domain(d3.extent(data, function(d) { return d.victims; }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            // main title text
            svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px")  
            .text("Victims from Mass Shootings in the United States of America");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Total Victims");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5);

        var tooltipDate = tooltip.append("div")
            .attr("class", "myTooltip-date");

        var tooltipLikes = tooltip.append("div");
        tooltipLikes.append("span")
            .attr("class", "myTooltip-title")
            .text("Victims: ");

        var tooltipLikesValue = tooltipLikes.append("span")
            .attr("class", "myTooltip-likes");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); tooltip.style("display", null);  })
            .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.victims) + ")");
            tooltip.attr("style", "left:" + (x(d.date)+64) + "px;top:" + (y(d.victims)-50)+ "px;");
            tooltip.select(".myTooltip-date").text(dateFormatter(d.date));
            tooltip.select(".myTooltip-likes").text(formatValue(d.victims));

            //console.log(y(d.victims));
        }
    });
