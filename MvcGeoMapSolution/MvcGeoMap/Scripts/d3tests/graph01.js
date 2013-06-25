function printRgb() {
    var result = "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    return result;
};
function myRgb(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.rgb = printRgb;
};

function createPallete(lowColor, middleColor, highColor, lenght) {
    var pallete = [];

    var lengthLow = Math.floor((lenght - 1) / 2);
    var lengthHigh = lenght - 1 - lengthLow;

    var rIncLow = Math.floor((middleColor.red - lowColor.red) / lengthLow);
    var gIncLow = Math.floor((middleColor.green - lowColor.green) / lengthLow);
    var bIncLow = Math.floor((middleColor.blue - lowColor.blue) / lengthLow);


    var rIncHigh = Math.floor((highColor.red - middleColor.red) / lengthHigh);
    var gIncHigh = Math.floor((highColor.green - middleColor.green) / lengthHigh);
    var bIncHigh = Math.floor((highColor.blue - middleColor.blue) / lengthHigh);
    console.log(rIncLow);
    console.log(rIncHigh);

    for (var i = 0; i < lenght; i++) {
        rVal = (i <= lengthLow) ? (middleColor.red + rIncLow * (i - lengthLow)) : (middleColor.red + rIncHigh * (i - lengthLow));
        gVal = (i <= lengthLow) ? (middleColor.green + gIncLow * (i - lengthLow)) : (middleColor.green + gIncHigh * (i - lengthLow));
        bVal = (i <= lengthLow) ? (middleColor.blue + bIncLow * (i - lengthLow)) : (middleColor.blue + bIncHigh * (i - lengthLow));
        
        console.log(rVal);
        pallete[i] = new myRgb(rVal, gVal, bVal);
    }
    return pallete;
};

var myLowColor = new myRgb(220, 180, 180);
var myMiddleColor = new myRgb(240, 100, 100);
var myHighColor = new myRgb(255, 0, 0);
var colorPalleteLength = 6;
var colorPallete = createPallete(myLowColor, myMiddleColor, myHighColor, colorPalleteLength);

//////////////////////////////////////////////////////////////

var svg = d3.select("#graph01")
    .append("svg")
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
var currentShapes

function findObjectValue(data, objectName, value) {
    return $.grep(data, function (item) {
        return item[objectName] === value;
    })[0];
};
function cloneToSecond(firstObject, secondObject) {
    for (var prop in firstObject) {
        if (firstObject.hasOwnProperty(prop)) {
            secondObject[prop] = firstObject[prop];
        }
    }
}

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
    //myQuantize = d3.scale.quantize().domain([lowest, highest]).range(d3.range(5).map(function (i) { return "q" + (9-5+i) + "-9"; }));
    myQuantize = d3.scale.quantize().domain([lowest, highest]).range(d3.range(colorPalleteLength).map(function (i) { return colorPallete[i].rgb(); }));

d3.json("/Content/geoShapesJson/data/continent_wl.json", function (error, world) {
    currentShapes = g.selectAll('path').data(topojson.feature(world, world.objects.continents).features);
    currentShapes.enter().append('path')
    .attr('myID', function (d) {  return d.properties.name })
    .style('fill', function (d) { tempObject = findObjectValue(inputData, "Continent", d.properties.name); return (tempObject !== undefined) ? myQuantize(tempObject["Impressions"]) : "rgb(220, 220,220)"; })
    .attr('d', path);

});

});

