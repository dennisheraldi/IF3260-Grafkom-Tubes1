function polygonVertexHandler() {
    polygonVertex = document.getElementById("polygon-vertex").value;
}

function polygonButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Polygon";
    canvas.style.cursor = "crosshair";
    canvas.onmousedown = polygonMouseDownHandler;
    canvas.onmousemove = polygonMouseMoveHandler;
}

function polygonMouseDownHandler(e) {
    var x_down = getMousePosition(e)[0];
    var y_down = getMousePosition(e)[1];

    if (!mouseMoveDrawPolygon && currentPolygonVertex < polygonVertex - 1) {
        // start drawing
        // add the first point to the polygonPosition
        polygonPosition.push(x_down, y_down);
        // add the color to the polygonColor
        polygonColor.push(...currentColor);
        currentPolygonVertex++;
    }
    if (mouseMoveDrawPolygon && currentPolygonVertex < polygonVertex - 1) {
        mouseMoveDrawPolygon = false;
        polygonPosition[polygonPosition.length - 2] = x_down;
        polygonPosition[polygonPosition.length - 1] = y_down;
        currentPolygonVertex++;
    } else if (currentPolygonVertex == polygonVertex - 1) {
        // finish drawing
        currentPolygonVertex++;
        mouseMoveDrawPolygon = false;
        object.polygon.positions.push([...polygonPosition]);
        object.polygon.colors.push([...polygonColor]);
        polygonPosition = [];
        polygonColor = [];
        currentPolygonVertex = 0;
    }
}

function polygonMouseMoveHandler(e) {
    var x_move = getMousePosition(e)[0];
    var y_move = getMousePosition(e)[1];

    if (
        !mouseMoveDrawPolygon &&
        polygonPosition.length == 2 * currentPolygonVertex &&
        currentPolygonVertex != 0
    ) {
        mouseMoveDrawPolygon = true;
        // prettier-ignore
        polygonPosition.push( // fill the other 3 points
            x_move,
            y_move
        );
        // prettier-ignore
        polygonColor.push( // fill the other 3 points
            ...currentColor,
        );
    } else if (mouseMoveDrawPolygon) {
        // each time mouse move, update the polygon
        polygonPosition[polygonPosition.length - 2] = x_move;
        polygonPosition[polygonPosition.length - 1] = y_move;
    }
}
