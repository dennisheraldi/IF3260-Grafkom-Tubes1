var object = {
    rectangle: {
        //prettier-ignore
        positions: [],
        // prettier-ignore
        colors: [],
    },
};

var mouseMoveDrawRectangle = false;
var rectanglePosition = [];
// prettier-ignore
var rectangleColor = [
    1, 0, 1, 
    1, 0, 1, 
    1, 0, 1, 
    1, 0, 1, 
];

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

    console.log(gl);
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

        // Update the position and color buffer
        // For Rectangle
        // setPositionColorBuffer(
        //     object.rectangle.positions,
        //     object.rectangle.colors
        // );
        // var count = Math.floor(object.rectangle.positions.length / 2);
        // gl.drawArrays(gl.TRIANGLE_FAN, 0, count);
        for (var i = 0; i < object.rectangle.positions.length / 8; i++) {
            setPositionColorBuffer(
                object.rectangle.positions.slice(i * 8, (i + 1) * 8),
                rectangleColor
            );
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        }

        if (rectanglePosition.length == 8) {
            setPositionColorBuffer(rectanglePosition, rectangleColor);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
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

// Drawing on canvas handler

function rectangleMouseDownHandler(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x_down = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y_down = ((e.clientY - rect.top) / rect.height) * -2 + 1;

    if (!mouseMoveDrawRectangle) {
        // start drawing
        rectanglePosition.push(x_down, y_down);
    } else {
        // finish drawing
        mouseMoveDrawRectangle = false;
        object.rectangle.positions.push(...rectanglePosition);
        rectanglePosition = [];
        console.log(object);
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
    } else if (mouseMoveDrawRectangle) {
        // each time mouse move, update the rectangle
        rectanglePosition[2] = x_move;
        rectanglePosition[4] = x_move;
        rectanglePosition[5] = y_move;
        rectanglePosition[7] = y_move;
    }
}

window.onload = main;
