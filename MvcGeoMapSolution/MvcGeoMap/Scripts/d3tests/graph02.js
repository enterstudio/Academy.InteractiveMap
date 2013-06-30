var colorPallete = createPallete(myLowColor, myMiddleColor, myHighColor, colorPalleteLength);

//////////////////////////////////////////////////////////////
function findObjectValue(data, objectName, value) {
    return $.grep(data, function (item) {
        return item[objectName] === value;
    })[0];
};



///////////////////////////////////////

var metricSelector =
    d3.select("#adformMetricSelector")
    .append('select')
    .on('change', getNewSelectedMetric)
    .selectAll("option").data(adformMetricNames)
    .enter().append("option")
    .attr("value", function (d, i) { return i })
    .text(function (d) { return d.name; });


var currentSelectedMetric = adformMetricNames[0];

function getNewSelectedMetric() {
    currentSelectedMetric = (this.options[this.selectedIndex].__data__);
}



//////////////////////////////////////////////////////////////
// load stats and shape files.


var currentLevelData;
var currentLevelShapes;

var lowest = 0;
var highest = 0;
var tempValue;
$.ajax({
    async: false,
    dataType: "json",
    url: "/Content/data/continent_level_data.json",
    success: function (data) {
        currentLevelData = data;
    }
});
$.ajax({
    async: false,
    dataType: "json",
    url: "/Content/geoShapesJson/data/continent_wl.json",
    success: function (data) {
        currentLevelShapes = data;
    }
});

if (currentLevelData.length < 1) {
    console.warn("Current data array is empty!")
}


lowest = currentLevelData[0].Impressions;
highest = lowest;

for (var i = 0; i < currentLevelData.length; i++) {
    tempValue = currentLevelData[i].Impressions;
    if (tempValue < lowest) lowest = tempValue;
    if (tempValue > highest) highest = tempValue;
}

var colorChooser;
colorChooser = d3.scale.quantize().domain([lowest, highest]).range(d3.range(colorPalleteLength).map(function (i) { return colorPallete[i].rgb(); }));


var svg = d3.select("#graph02")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


svg.append("rect")
.attr("class", "background")
.attr("width", width)
.attr("height", height);

var currentGroup = svg
    .append("g")
    .attr("id", "continents");

var myCurrentShapes = currentGroup.selectAll('path')
    .data(topojson.feature(currentLevelShapes, currentLevelShapes.objects.continents).features);

var formatTime = d3.time.format("%e %B");

var dataTooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
dataTooltip.select("div")
    .append('p')
    .text("asd");

myCurrentShapes.enter()
    .append('path')
    .attr('myID', function (d) { return d.properties.name })
    .style('fill', function (d) {
        var fillColor;
        var tempObject = findObjectValue(currentLevelData, "Continent", d.properties.name);
        if (tempObject !== undefined) {
            fillColor = colorChooser(tempObject["Impressions"]);
        } else {
            fillColor = "rgb(220, 220,220)";
        }
        return fillColor;
    })
    .attr('d', path)
    .on("mouseover", function (d) { mouseover(d); })
    .on("mousemove", function (d) { mousemove(d); })
    .on("mouseout", function (d) { mouseout(d); });

function mouseover(data) {
    dataTooltip.transition()
        .duration(1000)
        .style("opacity", 0.9);
}

function mouseout(data) {
    dataTooltip.transition()
        .duration(1000)
        .style("opacity", 0);
}
function mousemove(data) {

    dataTooltip
        .style("left", (d3.event.pageX - 155) + "px")
        .style("top", (d3.event.pageY + 0) + "px")
        .text("");
    dataTooltip.append('h1').text(data.properties.name);
    dataTooltip.append('hr');

    var currentRegionStats = findObjectValue(currentLevelData, "Continent", data.properties.name);
    if (currentRegionStats !== undefined) {
        for (var i = 0; i < adformMetricNames.length; i++) {
            dataTooltip
                .append('p')
                .text(adformMetricNames[i].name
                + ": "
                + d3.format(adformMetricNames[i].textFormat)
                (currentRegionStats[adformMetricNames[i].name])
                );
        }
    } else {
        dataTooltip
               .append('p')
               .text('No data for selected region');
    }


}

