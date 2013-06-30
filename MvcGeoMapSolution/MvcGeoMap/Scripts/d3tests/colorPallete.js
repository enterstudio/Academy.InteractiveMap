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

    var pallete = new Array(lenght);
    var breakpoint = 0.5;
    var totalSteps = lenght - 1;
    var fraction;
    var DiffLow = new myRgb();
    var DiffHigh = new myRgb();
    var tempColor;

    DiffLow.red = (middleColor.red - lowColor.red);
    DiffLow.green = (middleColor.green - lowColor.green);
    DiffLow.blue = (middleColor.blue - lowColor.blue);

    DiffHigh.red = (highColor.red - middleColor.red);
    DiffHigh.green = (highColor.green - middleColor.green);
    DiffHigh.blue = (highColor.blue - middleColor.blue);

    for (var i = 0; i < lenght; i++) {
        tempColor = new myRgb()
        if (i / totalSteps <= breakpoint) {
            fraction = i / totalSteps * 2;

            tempColor.red = lowColor.red + Math.floor( DiffLow.red * fraction);
            tempColor.green = lowColor.green + Math.floor(DiffLow.green * fraction);
            tempColor.blue = lowColor.blue + Math.floor(DiffLow.blue * fraction);

        } else {
            fraction = (i / totalSteps - breakpoint) * 2;

            tempColor.red = middleColor.red + Math.floor(DiffHigh.red * fraction);
            tempColor.green = middleColor.green + Math.floor(DiffHigh.green * fraction);
            tempColor.blue = middleColor.blue + Math.floor(DiffHigh.blue * fraction);
        }

        pallete[i]=tempColor;
    }
    return pallete;
};
