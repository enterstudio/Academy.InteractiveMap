var width = 1000,
    height = 600,
    centered;
var projection = d3.geo.equirectangular()
    .scale(150);
var path = d3.geo.path().projection(projection);

var adformMetricNames = [
    { name: "Impressions", textFormat: ",.0f" },
    { name: "Unique Impressions", textFormat: ",.0f" },
    { name: "Clicks", textFormat: ",.0f" },
    { name: "Unique Clicks", textFormat: ",.0f" },
    { name: "CTR (%)", textFormat: ".2%" },
    { name: "Unique CTR (%)", textFormat: ".2%" },
    { name: "Leads", textFormat: ",.0f" },
    { name: "COV (%)", textFormat: ".2%" },
    { name: "Sales", textFormat: ",.0f" }
];

var myLowColor = new myRgb(220, 180, 180);
var myMiddleColor = new myRgb(240, 100, 100);
var myHighColor = new myRgb(255, 0, 0);
var colorPalleteLength = 6;