var width = 1000,
    height = 600,
    centered;
var projection = d3.geo.equirectangular()
    .scale(150);
var path = d3.geo.path().projection(projection);