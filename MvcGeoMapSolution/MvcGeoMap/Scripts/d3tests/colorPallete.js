window.utils = window.utils || {};

window.utils.RgbColor = function (red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
};
window.utils.RgbColor.prototype.toString = function () {
    var result = "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    return result;
};

window.utils.RgbColor.prototype.setFromString = function (inputRgbString) {
    var rgbValues = new Array;
    function filterRgbValues(element, index, array) {
        return (element >= 0 && element <= 255);
    };

    rgbValues = inputRgbString.match(/-?[0-9]{1,}/g);
    rgbValues = rgbValues.filter(filterRgbValues);

    if (rgbValues.length !== 3) {
        throw "Invalid Rgb input string provided."
    } else {
        this.red = rgbValues[0];
        this.green = rgbValues[1];
        this.blue = rgbValues[2];
    };
};


window.utils.createPallete = function (lowColor, middleColor, highColor, lenght) {
    //optional parameter
    var middleColor = middleColor || new window.utils.RgbColor(Math.round(0.5 * (highColor.red + lowColor.red)), Math.round(0.5 * (highColor.green + lowColor.green)), Math.round(0.5 * (highColor.blue + lowColor.blue)));

    var diffLow = new window.utils.RgbColor();
    var diffHigh = new window.utils.RgbColor();
    var pallete = new Array(lenght);

    var totalSteps = lenght - 1;
    var breakpoint = 0.5;

    var fraction;
    var tempColor;

    diffLow.red = (middleColor.red - lowColor.red);
    diffLow.green = (middleColor.green - lowColor.green);
    diffLow.blue = (middleColor.blue - lowColor.blue);

    diffHigh.red = (highColor.red - middleColor.red);
    diffHigh.green = (highColor.green - middleColor.green);
    diffHigh.blue = (highColor.blue - middleColor.blue);

    for (var i = 0; i < lenght; i++) {

        tempColor = new window.utils.RgbColor();

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
