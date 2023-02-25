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

  if (vertexNow == null || vertexNow[0] != "polygon") {
    vertexNow = findVertex(x_down, y_down);
    console.log(vertexNow)
  } else {
    var shapeType = vertexNow[0];
    var shapeIndex = vertexNow[1];
    var vertexIndex = vertexNow[2];
      // add vertex positions and colors

    polygonPosition = object.polygon.positions[shapeIndex];
    polygonColor = object.polygon.colors[shapeIndex];
    polygonPosition.splice((vertexIndex + 1) * 2, 0, x_down, y_down);
    polygonColor.splice((vertexIndex + 1) * 3, 0, ...currentColor);

    if (isPolygonConvexHull) {
      polygonPosition = convexHull(polygonPosition);
      // color filling
      polygonColor = [];
      for (var i = 0; i < polygonPosition.length / 2; i++) {
        polygonColor.push(...currentColor);
      }
    } 
    object.polygon.positions[shapeIndex] = polygonPosition;
    object.polygon.colors[shapeIndex] = polygonColor;
    polygonPosition = []
    polygonColor = []
    shapeNow = null;
    vertexNow = null;
  }
}
