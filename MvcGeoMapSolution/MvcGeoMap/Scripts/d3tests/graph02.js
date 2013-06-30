var myLowColor = new myRgb(220, 180, 180);
var myMiddleColor = new myRgb(240, 100, 100);
var myHighColor = new myRgb(255, 0, 0);
var colorPalleteLength = 6;
var colorPallete = createPallete(myLowColor, myMiddleColor, myHighColor, colorPalleteLength);

var metricNames = ["Impressions", "Unique Impressions", "Clicks", "Unique Clicks", "CTR (%)", "Unique CTR (%)", "Leads", "COV (%)", "Sales"];

var adformMetricNames = [
    {name : "Impressions", textFormat : ",.0f"},
    { name: "Unique Impressions", textFormat: ",.0f" },
    { name: "Clicks", textFormat: ",.0f" },
    { name: "Unique Clicks", textFormat: ",.0f" },
    { name: "CTR (%)", textFormat: ".2%" },
    { name: "Unique CTR (%)", textFormat: ".2%" },
    { name: "Leads", textFormat: ",.0f" },
    { name: "COV (%)", textFormat: ".2%" },
    { name: "Sales", textFormat: ",.0f" }
];
//////////////////////////////////////////////////////////////
function findObjectValue(data, objectName, value) {
    return $.grep(data, function (item) {
        return item[objectName] === value;
    })[0];
};


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

if (currentLevelData.length < 1)
    console.warn("Current data array is empty!")

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
var currentRegionStats
function mousemove(data) {
    currentRegionStats = findObjectValue(currentLevelData, "Continent", data.properties.name);

    dataTooltip
        .style("left", (d3.event.pageX - 155) + "px")
        .style("top", (d3.event.pageY + 0) + "px")
        .text("");
    dataTooltip.append('h1').text(data.properties.name);
    dataTooltip.append('hr');

    for (var i = 0; i < adformMetricNames.length; i++) {
        dataTooltip
            .append('p')
            .text(adformMetricNames[i].name
            + ": "
            + d3.format(adformMetricNames[i].textFormat)
            (currentRegionStats[adformMetricNames[i].name])
            );
    }
}

