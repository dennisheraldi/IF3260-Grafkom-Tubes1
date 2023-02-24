var selectedShape = "";
var selectedShapeIndex = -1;
var selectedShapePointIndex = -1;
var mouseMoveSelect = false;

var x_0 = "";
var y_0 = "";

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
            x_0 =
                object.square.positions[selectedShapeIndex][
                    ((selectedShapePointIndex + 2) % 4) * 2
                ];
            y_0 =
                object.square.positions[selectedShapeIndex][
                    ((selectedShapePointIndex + 2) % 4) * 2 + 1
                ];
            x_select =
                object.square.positions[selectedShapeIndex][
                    selectedShapePointIndex * 2
                ];
            y_select =
                object.square.positions[selectedShapeIndex][
                    selectedShapePointIndex * 2 + 1
                ];
            object.square.positions[selectedShapeIndex] = [
                x_0,
                y_0,
                x_select,
                y_0,
                x_select,
                y_select,
                x_0,
                y_select,
            ];
            mouseMoveSelect = true;
        }
    } else {
        mouseMoveSelect = false;
        selectedShape = "";
        selectedShapeIndex = -1;
        selectedShapePointIndex = -1;
        x_0 = "";
        y_0 = "";
    }
}

function selectMouseMoveHandler(e) {
    var x_move = getMousePosition(e)[0];
    var y_move = getMousePosition(e)[1];

    // to keep the square isolated
    if (selectedShape == "square") {
        var kx = x_move >= x_0 ? 1 : -1;
        var ky = y_move >= y_0 ? 1 : -1;

        var radius =
            x_move <= y_move ? Math.abs(x_move - x_0) : Math.abs(y_move - y_0);
    }

    if (!mouseMoveSelect && selectedShape != "") {
        mouseMoveSelect = true;
        if (selectedShape == "square") {
            // rearrange points
            object.square.positions[selectedShapeIndex] = [];
            // prettier-ignore
            object.square.positions[selectedShapeIndex].push(
                // 0               1
                x_0, y_0,
                // 2               3
                x_0 + kx * radius, y_0,
                // 4               5
                x_0 + kx * radius, y_0 + ky * radius,
                // 6               7
                x_0, y_0 + ky * radius,
            );
        }
    } else if (mouseMoveSelect) {
        if (selectedShape == "line") {
            object.line.positions[selectedShapeIndex][
                selectedShapePointIndex * 2
            ] = x_move;
            object.line.positions[selectedShapeIndex][
                selectedShapePointIndex * 2 + 1
            ] = y_move;
        } else if (selectedShape == "square") {
            // each time mouse move, update the square
            object.square.positions[selectedShapeIndex][2] = x_0 + kx * radius;
            object.square.positions[selectedShapeIndex][4] = x_0 + kx * radius;
            object.square.positions[selectedShapeIndex][5] = y_0 + ky * radius;
            object.square.positions[selectedShapeIndex][7] = y_0 + ky * radius;
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
