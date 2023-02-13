class State {
    constructor(gl) {
        this.mouseMoveDrawRectangle = false;
        this.mouseMoveDrawLine = false;
        this.currentColor = [0, 0, 1];
        this.staticModel = new Model(gl);
    }
}

var object = {
    line: {
        // prettier-ignore
        positions: [],
        // prettier-ignore
        colors: [],
    },
    square: {
        positions: [],
        colors: [],
    },
    rectangle: {
        //prettier-ignore
        positions: [],
        // prettier-ignore
        colors: [],
    },
};

var mouseMoveDrawRectangle = false;
var rectanglePosition = [];
var rectangleColor = [];
// prettier-ignore

var mouseMoveDrawLine = false;
var linePosition = [];
var lineColor = [];

var mouseMoveResize = false;
var resizePosition = [];
var resizeRectangleIndex = -1;
var resizeLineIndex = [];

var currentColor = [0, 0, 1];
