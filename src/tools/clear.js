function clearButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "";
    canvas.style.cursor = "default";
    object.rectangle.positions = [];
    object.rectangle.colors = [];
    object.line.positions = [];
    object.line.colors = [];
    object.polygon.colors = [];
    object.polygon.positions = [];
    rectanglePosition = [];
    rectangleColor = [];
    linePosition = [];
    lineColor = [];
    squareCenter = [];
    squarePosition = [];
    polygonPosition = [];
    polygonColor = [];
}
