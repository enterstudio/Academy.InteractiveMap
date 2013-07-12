function RgbColor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
};
RgbColor.prototype.toString = function() {
    var result = "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    return result;
};
function createPallete(lowColor, middleColor, highColor, lenght) {

    var pallete = new Array(lenght);
    var breakpoint = 0.5;
    var totalSteps = lenght - 1;
    var fraction;
    var diffLow = new RgbColor();
    var diffHigh = new RgbColor();
    var tempColor;

    diffLow.red = (middleColor.red - lowColor.red);
    diffLow.green = (middleColor.green - lowColor.green);
    diffLow.blue = (middleColor.blue - lowColor.blue);

    diffHigh.red = (highColor.red - middleColor.red);
    diffHigh.green = (highColor.green - middleColor.green);
    diffHigh.blue = (highColor.blue - middleColor.blue);

    for (var i = 0; i < lenght; i++) {
        tempColor = new RgbColor()
        if (i / totalSteps <= breakpoint) {
            fraction = i / totalSteps * 2;

            tempColor.red = lowColor.red + Math.round( diffLow.red * fraction);
            tempColor.green = lowColor.green + Math.round(diffLow.green * fraction);
            tempColor.blue = lowColor.blue + Math.round(diffLow.blue * fraction);

        } else {
            fraction = (i / totalSteps - breakpoint) * 2;

            tempColor.red = middleColor.red + Math.round(diffHigh.red * fraction);
            tempColor.green = middleColor.green + Math.round(diffHigh.green * fraction);
            tempColor.blue = middleColor.blue + Math.round(diffHigh.blue * fraction);
        }

        pallete[i]=tempColor;
    }
    return pallete;
};
