function colorButtonHandler() {
  var color = document.getElementById("color").value;
  // convert hex to rgb array
  currentColor = hexToRgb(color);
}

function clearButtonHandler() {
  console.log("Clear button clicked")
}

function polygonButtonHandler() {
  console.log("Polygon button clicked")
  isDrawing = true;
  // prompt input sisi
  let sisi = prompt("Masukkan jumlah sisi", "4");

  if (sisi != null) {
    console.log("Jumlah sisi: " + sisi);
    alert("Klik " + sisi + " kali pada canvas sebagai titik sudut polygon");
  }

  // create Polygon
  let poly = new Polygon(currentShapeId, "polygon", sisi, [])
  currentShape = poly

  // increment currentShapeId
  currentShapeId++;

  // get clicked
  canvas.onmousedown = (e) => {
    // get position
    if (currentPolygonSisi < sisi) {
      let pos = getMousePosition(e);
      console.log("pos: " + pos.x + "," + pos.y);

      // add vertex
      currentShapeVertices.push(new Vertex(pos.x, pos.y, currentColor));

      // increment currentPolygonSisi
      currentPolygonSisi++;
    }

    // finish drawing
    if (currentPolygonSisi == sisi) {
      // stop drawing
      isDrawing = false;
      currentShape.vertices = currentShapeVertices;
      shapes.push(currentShape);

      // reset currentPolygonSisi
      currentPolygonSisi = 0;

      // reset currentShapeVertices
      currentShapeVertices = [];

      // reset currentShape
      currentShape = null;

      // remove event listener
      canvas.onmousedown = null;
      console.log(shapes)
    }
  }

}