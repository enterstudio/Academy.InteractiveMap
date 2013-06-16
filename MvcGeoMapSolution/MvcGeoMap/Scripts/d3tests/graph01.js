var svg = d3.select("#graph01").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
.attr("class", "background")
.attr("width", width)
.attr("height", height);

var g = svg.append("g")
    .attr("id", "continents");

var inputData;
var lowest = 0;
var highest = 0;
var tmp;
var myQuantize;
function findObjectValue(data, objectName, value) {
    return $.grep(data, function (item) {
        return item[objectName] === value;
    })[0];
};


inputData = d3.json("/Content/data/continent_level_data.json", function (error, data) {
    if (error) return console.warn(error);
    inputData = data;
    lowest = data[0].Impressions;
    highest = lowest;
    for (var i = 0; i < data.length; i++) {
        tmp = data[i].Impressions;
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
    }
    myQuantize = d3.scale.quantize().domain([lowest, highest]).range(d3.range(5).map(function (i) { return "q" + (9-5+i) + "-9"; }));


d3.json("/Content/geoShapesJson/data/continent_wl.json", function (error, world) {
    g.selectAll('path')
    .data(topojson.feature(world, world.objects.continents).features)
    .enter().append('path')
    .attr('myID', function (d) { return d.properties.name })
    .attr('class', function (d) { asd = findObjectValue(inputData, "Continent", d.properties.name); return (asd !== undefined) ? myQuantize(asd["Impressions"]) : "empty"; })
    .attr('d', path);

});

});