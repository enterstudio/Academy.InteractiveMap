var myLowColor = new myRgb(220, 180, 180);
var myMiddleColor = new myRgb(240, 100, 100);
var myHighColor = new myRgb(255, 0, 0);
var colorPalleteLength = 6;
var colorPallete = createPallete(myLowColor, myMiddleColor, myHighColor, colorPalleteLength);

//////////////////////////////////////////////////////////////



var inputData;
var lowest = 0;
var highest = 0;
var tmp;
var myQuantize;
var currentShapes


var dataAdf;
$.getJSON("/Content/data/continent_level_data.json", function (data) {
    dataAdf = data;
});


var obj = JSON.parse(dataAdf);
alert(obj.continent === "Africa");