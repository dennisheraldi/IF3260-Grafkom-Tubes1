var object = {
    rectangle: {
        //prettier-ignore
        positions: [],
        // prettier-ignore
        colors: [],
    },
    line: {
        // prettier-ignore
        positions: [],
        // prettier-ignore
        colors: [],
    },
};

//Clear
var clearButton = document.getElementById("clear-button");
clearButton.onclick = function () {
    // Clear all arrays in the object
    object.rectangle.positions = [];
    object.rectangle.colors = [];
    object.line.positions = [];
    object.line.colors = [];
    rectanglePosition = [];
    rectangleColor = [];
    linePosition = [];
    lineColor = [];
};

var mouseMoveDrawRectangle = false;
var rectanglePosition = [];
var rectangleColor = [];
// prettier-ignore

var mouseMoveDrawLine = false;
var linePosition = [];
var lineColor = [];

var currentColor = [0, 0, 1];

// Get the canvas element
var canvas = document.getElementById("canvas");

function main() {
    // Create a WebGL context
    var gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
        alert("Your browser does not support WebGL");
        return;
    }
    // Setup GLSL program
    var program = createProgram(gl, vertexShaderText, fragmentShaderText);

    // Get attribute locations
    var positionAttribLocation = gl.getAttribLocation(program, "a_position");
    var colorAttribLocation = gl.getAttribLocation(program, "a_color");

    // // Get uniform locations
    // var matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");

    // Create position buffer
    var positionBuffer = gl.createBuffer();

    // Create color buffer
    var colorBuffer = gl.createBuffer();

    // Set position and color buffer
    function setPositionColorBuffer(position, color) {
        // Set position buffer
        setBuffer(gl, positionBuffer, position, positionAttribLocation, 2);

        // Set color buffer
        setBuffer(gl, colorBuffer, color, colorAttribLocation, 3);
    }

    // Scene drawer
    function drawScene() {
        // Set the viewport
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(1, 1, 0.9, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Use the program (shaders)
        gl.useProgram(program);

        // Update the rectangle position and color buffer
        for (var i = 0; i < object.rectangle.positions.length; i++) {
            setPositionColorBuffer(
                object.rectangle.positions[i],
                object.rectangle.colors[i]
            );
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        }

        // Update rectangle when mouse move
        if (rectanglePosition.length == 8) {
            setPositionColorBuffer(rectanglePosition, rectangleColor);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        }

        // Update the line position and color buffer
        for (var i = 0; i < object.line.positions.length / 4; i++) {
            setPositionColorBuffer(
                object.line.positions.slice(i * 4, (i + 1) * 4),
                object.line.colors.slice(i * 12, (i + 1) * 12)
            );
            gl.drawArrays(gl.LINES, 0, 2);
        }

        // Update line when mouse move
        if (linePosition.length == 4) {
            setPositionColorBuffer(linePosition, lineColor);
            gl.drawArrays(gl.LINES, 0, 2);
        }

        window.requestAnimationFrame(drawScene);
    }

    // --------------------------------------------------------------------------

    drawScene();
}

// Tool button handler
function selectButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Select";
}

function rectangleButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Rectangle";
    canvas.onmousedown = rectangleMouseDownHandler;
    canvas.onmousemove = rectangleMouseMoveHandler;
}

function lineButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Line";
    canvas.onmousedown = lineMouseDownHandler;
    canvas.onmousemove = lineMouseMoveHandler;
}

function colorButtonHandler() {
    var color = document.getElementById("color").value;
    // convert hex to rgb array
    currentColor = hexToRgb(color);
}

function fillButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Fill";
    canvas.onmousedown = fillMouseDownHandler;
}

// Drawing on canvas handler

function rectangleMouseDownHandler(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x_down = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y_down = ((e.clientY - rect.top) / rect.height) * -2 + 1;

    if (!mouseMoveDrawRectangle) {
        // start drawing
        // add the first point to the rectanglePosition
        rectanglePosition.push(x_down, y_down);
        // add the color to the rectangleColor
        rectangleColor.push(...currentColor);
    } else {
        // finish drawing
        mouseMoveDrawRectangle = false;
        object.rectangle.positions.push([...rectanglePosition]);
        object.rectangle.colors.push([...rectangleColor]);
        rectanglePosition = [];
        rectangleColor = [];
    }
}

function rectangleMouseMoveHandler(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x_move = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y_move = ((e.clientY - rect.top) / rect.height) * -2 + 1;

    if (!mouseMoveDrawRectangle && rectanglePosition.length == 2) {
        mouseMoveDrawRectangle = true;
        // prettier-ignore
        rectanglePosition.push( // fill the other 3 points
            x_move,rectanglePosition[1],
            x_move,y_move,
            rectanglePosition[0],y_move,
        );
        // prettier-ignore
        rectangleColor.push( // fill the other 3 points
            ...currentColor, 
            ...currentColor,
            ...currentColor,
        );
    } else if (mouseMoveDrawRectangle) {
        // each time mouse move, update the rectangle
        rectanglePosition[2] = x_move;
        rectanglePosition[4] = x_move;
        rectanglePosition[5] = y_move;
        rectanglePosition[7] = y_move;
    }
}

function lineMouseDownHandler(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x_down = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y_down = ((e.clientY - rect.top) / rect.height) * -2 + 1;

    if (!mouseMoveDrawLine) {
        // start drawing
        // add the first point to the linePosition
        linePosition.push(x_down, y_down);
        // add the color to the lineColor
        lineColor.push(...currentColor, ...currentColor);
    } else {
        // finish drawing
        mouseMoveDrawLine = false;
        object.line.positions.push(...linePosition);
        object.line.colors.push(...lineColor);
        linePosition = [];
        lineColor = [];
    }
}

function lineMouseMoveHandler(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x_move = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y_move = ((e.clientY - rect.top) / rect.height) * -2 + 1;

    if (!mouseMoveDrawLine && linePosition.length == 2) {
        mouseMoveDrawLine = true;
        // prettier-ignore
        linePosition.push( // fill the other 2 points
            x_move,y_move,
        );
        // prettier-ignore
        lineColor.push( // fill the other 2 points
            ...currentColor, ...currentColor,
        );
    } else if (mouseMoveDrawLine) {
        // each time mouse move, update the line
        linePosition[2] = x_move;
        linePosition[3] = y_move;
    }
}

function fillMouseDownHandler(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x_down = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y_down = ((e.clientY - rect.top) / rect.height) * -2 + 1;

    function distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    // check for each rectangle
    for (var i = 0; i < object.rectangle.positions.length; i++) {
        var position = object.rectangle.positions[i];
        // check for each point in the rectangle
        for (var p = 0; p < position.length; p++) {
            if (
                distance(x_down, y_down, position[p * 2], position[p * 2 + 1]) <
                0.1
            ) {
                // fill the color for corresponding point
                object.rectangle.colors[i][p * 3] = currentColor[0];
                object.rectangle.colors[i][p * 3 + 1] = currentColor[1];
                object.rectangle.colors[i][p * 3 + 2] = currentColor[2];
            }
        }
    }
}

// Misc functions
function hexToRgb(hex) {
    // parse the hex string
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
    ];
}

function pointIsInPoly(p, polygon) {
    var isInside = false;
    var minX = polygon[0].x,
        maxX = polygon[0].x;
    var minY = polygon[0].y,
        maxY = polygon[0].y;
    for (var n = 1; n < polygon.length; n++) {
        var q = polygon[n];
        minX = Math.min(q.x, minX);
        maxX = Math.max(q.x, maxX);
        minY = Math.min(q.y, minY);
        maxY = Math.max(q.y, maxY);
    }

    if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
        return false;
    }

    var i = 0,
        j = polygon.length - 1;
    for (i, j; i < polygon.length; j = i++) {
        if (
            polygon[i].y > p.y != polygon[j].y > p.y &&
            p.x <
                ((polygon[j].x - polygon[i].x) * (p.y - polygon[i].y)) /
                    (polygon[j].y - polygon[i].y) +
                    polygon[i].x
        ) {
            isInside = !isInside;
        }
    }

    return isInside;
}

console.log(
    pointIsInPoly({ x: 0.5, y: 0.5 }, [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
    ])
);

window.onload = main;
