function getMousePosition(e) {
  var rect = e.target.getBoundingClientRect();
  return {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * -2 + 1,
  };
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
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
  // function setPositionColorBuffer(position, color) {
  //     // Set position buffer
  //     setBuffer(gl, positionBuffer, position, positionAttribLocation, 2);

  //     // Set color buffer
  //     setBuffer(gl, colorBuffer, color, colorAttribLocation, 3);
  // }

  // BUG: MASIH BLM BISA GAMBAR, ADA KESALAHAN DI BUFFER
  // TODO: Solve bug
  function setPositionColorBuffer(vertices) {
    // set position buffer and color buffer from vertices
    var position = [];
    var color = [];
    for (var i = 0; i < vertices.length; i++) {
      position.push(vertices[i].x)
      position.push(vertices[i].y)
      color.push(vertices[i].color[0]);
      color.push(vertices[i].color[1]);
      color.push(vertices[i].color[2]);
    }

    console.log(position);
    console.log(color);

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

      // draw shapes
      for (var shape_num = 0; shape_num < shapes.length; shape_num++) {
        // console.log("draw" + shapes[i].shapeName);
        setPositionColorBuffer(shapes[i].vertices);
        if (shapes[i].type == "polygon") {
          gl.drawArrays(gl.TRIANGLES_FAN, 0, shapes[i].vertices.length);
        }
      }

      window.requestAnimationFrame(drawScene);
  }

  // --------------------------------------------------------------------------

  drawScene();
}

window.onload = main;