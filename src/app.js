object = {
    square: {
        //prettier-ignore
        positions: [
            -0.15, -0.15, 
            0.15, -0.15, 
            -0.15, 0.15, 
            0.15, -0.15, 
            -0.15, 0.15, 
            0.15, 0.15,
        ],
        // prettier-ignore
        colors: [
            1, 0, 0, 
            1, 0, 0, 
            1, 0, 0, 
            1, 0, 0, 
            1, 0, 0, 
            1, 0, 0,
        ],
    },
};

function main() {
    // Get the canvas element
    var canvas = document.getElementById("canvas");

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

        // Update the position and color buffer
        // For Rectangle
        setPositionColorBuffer(object.square.positions, object.square.colors);
        var count = Math.floor(object.square.positions.length / 2);
        gl.drawArrays(gl.TRIANGLES, 0, count);
    }

    // --------------------------------------------------------------------------

    drawScene();
}

window.onload = main;
