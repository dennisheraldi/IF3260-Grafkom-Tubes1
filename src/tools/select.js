var selectedShape = "";
var selectedShapeIndex = -1;
var selectedShapePointIndex = -1;
var mouseMoveSelect = false;

function selectButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Select";
    canvas.style.cursor = "default";
    canvas.onmousemove = selectMouseMoveHandler;
    canvas.onmousedown = selectMouseDownHandler;
}

function selectMouseDownHandler(e) {
    var x_down = getMousePosition(e)[0];
    var y_down = getMousePosition(e)[1];

    if (!mouseMoveSelect) {
        var vertex = findVertex(x_down, y_down);
        if (vertex != null) {
            selectedShape = vertex[0];
            selectedShapeIndex = vertex[1];
            selectedShapePointIndex = vertex[2];
            mouseMoveSelect = true;
        }
    } else {
        mouseMoveSelect = false;
        selectedShape = "";
        selectedShapeIndex = -1;
        selectedShapePointIndex = -1;
    }
}

function selectMouseMoveHandler(e) {
    var x_move = getMousePosition(e)[0];
    var y_move = getMousePosition(e)[1];

    if (!mouseMoveSelect && selectedShape != "") {
        mouseMoveSelect = true;
    } else if (mouseMoveSelect) {
        if (selectedShape == "line") {
            object.line.positions[selectedShapeIndex][
                selectedShapePointIndex * 2
            ] = x_move;
            object.line.positions[selectedShapeIndex][
                selectedShapePointIndex * 2 + 1
            ] = y_move;
        } else if (selectedShape == "square") {
            object.square.positions[selectedShapeIndex][
                selectedShapePointIndex * 2
            ] = x_move;
            object.square.positions[selectedShapeIndex][
                selectedShapePointIndex * 2 + 1
            ] = y_move;
        } else if (selectedShape == "rectangle") {
            object.rectangle.positions[selectedShapeIndex][
                selectedShapePointIndex * 2
            ] = x_move;
            object.rectangle.positions[selectedShapeIndex][
                selectedShapePointIndex * 2 + 1
            ] = y_move;
        } else if (selectedShape == "polygon") {
            object.polygon.positions[selectedShapeIndex][
                selectedShapePointIndex * 2
            ] = x_move;
            object.polygon.positions[selectedShapeIndex][
                selectedShapePointIndex * 2 + 1
            ] = y_move;
        }
    }
}
