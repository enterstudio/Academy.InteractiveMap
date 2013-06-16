var width = 1160,
    height = 960,
    centered;
var projection = d3.geo.equirectangular()
    .scale(150);
var path = d3.geo.path().projection(projection);