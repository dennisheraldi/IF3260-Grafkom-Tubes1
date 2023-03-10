// Get the canvas element
var canvas = document.getElementById("canvas");

// Create a WebGL context
var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

if (!gl) {
    alert("Your browser does not support WebGL");
}
// Setup GLSL program
var program = createProgram(gl, vertexShaderText, fragmentShaderText);

// Get attribute locations
var positionAttribLocation = gl.getAttribLocation(program, "a_position");
var colorAttribLocation = gl.getAttribLocation(program, "a_color");

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

function main() {
    // Scene drawer
    drawScene();

    function drawScene() {
        // Set the viewport
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(1, 1, 0.9, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Use the program (shaders)
        gl.useProgram(program);

        // Update the line position and color buffer
        for (var i = 0; i < object.line.positions.length; i++) {
            setPositionColorBuffer(
                object.line.positions[i],
                object.line.colors[i]
            );
            gl.drawArrays(gl.LINES, 0, 2);
        }

        // Update line when mouse move
        if (linePosition.length == 4) {
            setPositionColorBuffer(linePosition, lineColor);
            gl.drawArrays(gl.LINES, 0, 2);
        }

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

        // Update the square position and color buffer
        for (var i = 0; i < object.square.positions.length; i++) {
            setPositionColorBuffer(
                object.square.positions[i],
                object.square.colors[i]
            );
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        }

        // Update square when mouse move
        if (squarePosition.length == 8) {
            setPositionColorBuffer(squarePosition, squareColor);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        }

        // Update the polygon position and color buffer
        for (var i = 0; i < object.polygon.positions.length; i++) {
            setPositionColorBuffer(
                object.polygon.positions[i],
                object.polygon.colors[i]
            );
            gl.drawArrays(
                gl.TRIANGLE_FAN,
                0,
                object.polygon.positions[i].length / 2
            );
        }

        // Update polygon when mouse move
        if (polygonPosition.length > 0) {
            setPositionColorBuffer(polygonPosition, polygonColor);
            gl.drawArrays(gl.LINE_LOOP, 0, polygonPosition.length / 2);
        }

        window.requestAnimationFrame(drawScene);
    }
}

window.onload = main;
