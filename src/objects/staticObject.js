var object = {
    line: {
        positions: [],
        colors: [],
    },
    square: {
        positions: [],
        colors: [],
    },
    rectangle: {
        positions: [],
        colors: [],
    },
    polygon: {
        positions: [],
        colors: [],
    },
};

var mouseMoveDrawLine = false;
var linePosition = [];
var lineColor = [];

var mouseMoveDrawRectangle = false;
var rectanglePosition = [];
var rectangleColor = [];

var mouseMoveDrawPolygon = false;
var polygonPosition = [];
var polygonColor = [];
var currentPolygonVertex = 0;
var polygonVertex = document.getElementById("polygon-vertex").value;

var currentColor = [0, 0, 1];

// class State {
//     constructor(gl) {
//         this.mouseMoveDrawRectangle = false;
//         this.mouseMoveDrawLine = false;
//         this.currentColor = [0, 0, 1];
//         this.staticModel = new Model(gl);
//     }
// }
