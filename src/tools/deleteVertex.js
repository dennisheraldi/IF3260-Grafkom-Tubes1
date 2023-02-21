function deleteVertexButtonHandler() {
  document.getElementById("selected-tool").innerHTML = "Delete Polygon Vertex";
  canvas.style.cursor = "default";
  canvas.onmousedown = deleteVertexHandler;
}

function deleteVertexHandler(e) {
  var x_down = getMousePosition(e)[0];
  var y_down = getMousePosition(e)[1];
  
  var vertex = findVertex(x_down, y_down);
  if (vertex != null) {
    var shapeType = vertex[0];
    var shapeIndex = vertex[1];
    var vertexIndex = vertex[2];
    if (shapeType == "polygon") {
      // delete vertex positions and colors
      object.polygon.positions[shapeIndex].splice(vertexIndex * 2, 2);
      object.polygon.colors[shapeIndex].splice(vertexIndex * 3, 3);

      if (object.polygon.positions[shapeIndex].length == 4) {
        // delete shape
        object.polygon.positions.splice(shapeIndex, 1);
        object.polygon.colors.splice(shapeIndex, 1);
      }
    }
  }
}