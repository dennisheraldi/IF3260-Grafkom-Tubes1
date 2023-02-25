var shapeNow = null
var vertexNow = null
var isPolygonConvexHull = false

function addVertexButtonHandler() {
  console.log("Add Vertex")
  document.getElementById("selected-tool").innerHTML = "Add Polygon Vertex";
  isPolygonConvexHull = document.getElementById("convex-hull").checked;
  canvas.style.cursor = "default";
  canvas.onmousedown = vertexMouseDownHandler;
}

function vertexMouseDownHandler(e) {
  var x_down = getMousePosition(e)[0];
  var y_down = getMousePosition(e)[1];
  console.log("x:", x_down, "y:", y_down);

  if (shapeNow == null) {
    shapeNow = findShape(x_down, y_down);
    console.log(shapeNow);
  } else {
    if (vertexNow == null) {
      vertexNow = findVertex(x_down, y_down);
      console.log(vertexNow);
    } else {
      var shapeType = shapeNow[0];
      var shapeIndex = shapeNow[1];
      var vertexIndex = vertexNow[2];
      if (shapeType == "polygon") {
        // add vertex positions and colors
        object.polygon.positions[shapeIndex].splice((vertexIndex + 1) * 2, 0, x_down, y_down);
        object.polygon.colors[shapeIndex].splice((vertexIndex + 1) * 3, 0, ...currentColor);
        shapeNow = null;
        vertexNow = null;
      }
    }
  }
}
