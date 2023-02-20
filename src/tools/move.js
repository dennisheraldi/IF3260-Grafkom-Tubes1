var movingShape = "";
var movingShapeMoveIndex = -1;
var mouseMoveMoving = false;
var movingStartPoint = [0, 0];

function moveButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Move";
    canvas.style.cursor = "default";
    canvas.onmousemove = moveMouseMoveHandler;
    canvas.onmousedown = moveMouseDownHandler;
}

function moveMouseDownHandler(e) {
    var x_down = getMousePosition(e)[0];
    var y_down = getMousePosition(e)[1];

    if (!mouseMoveMoving) {
        var shape = findShape(x_down, y_down);
        if (shape != null) {
            movingShape = shape[0];
            movingShapeMoveIndex = shape[1];
            mouseMoveMoving = true;
            movingStartPoint = [x_down, y_down];
        }
    } else {
        mouseMoveMoving = false;
        movingShape = "";
        movingShapeMoveIndex = -1;
        movingStartPoint = [0, 0];
    }
}

function moveMouseMoveHandler(e) {
    var x_move = getMousePosition(e)[0];
    var y_move = getMousePosition(e)[1];

    var translateX = x_move - movingStartPoint[0];
    var translateY = y_move - movingStartPoint[1];

    movingStartPoint = [x_move, y_move];

    if (!mouseMoveMoving && movingShape != "") {
        mouseMoveMoving = true;
    } else if (mouseMoveMoving) {
        if (movingShape == "line") {
            object.line.positions[movingShapeMoveIndex][0] += translateX;
            object.line.positions[movingShapeMoveIndex][1] += translateY;
            object.line.positions[movingShapeMoveIndex][2] += translateX;
            object.line.positions[movingShapeMoveIndex][3] += translateY;
        } else if (movingShape == "square") {
            object.square.positions[movingShapeMoveIndex][0] += translateX;
            object.square.positions[movingShapeMoveIndex][1] += translateY;
            object.square.positions[movingShapeMoveIndex][2] += translateX;
            object.square.positions[movingShapeMoveIndex][3] += translateY;
            object.square.positions[movingShapeMoveIndex][4] += translateX;
            object.square.positions[movingShapeMoveIndex][5] += translateY;
            object.square.positions[movingShapeMoveIndex][6] += translateX;
            object.square.positions[movingShapeMoveIndex][7] += translateY;
        } else if (movingShape == "rectangle") {
            object.rectangle.positions[movingShapeMoveIndex][0] += translateX;
            object.rectangle.positions[movingShapeMoveIndex][1] += translateY;
            object.rectangle.positions[movingShapeMoveIndex][2] += translateX;
            object.rectangle.positions[movingShapeMoveIndex][3] += translateY;
            object.rectangle.positions[movingShapeMoveIndex][4] += translateX;
            object.rectangle.positions[movingShapeMoveIndex][5] += translateY;
            object.rectangle.positions[movingShapeMoveIndex][6] += translateX;
            object.rectangle.positions[movingShapeMoveIndex][7] += translateY;
        } else if (movingShape == "polygon") {
            for (
                var i = 0;
                i < object.polygon.positions[movingShapeMoveIndex].length;
                i += 2
            ) {
                object.polygon.positions[movingShapeMoveIndex][i] += translateX;
                object.polygon.positions[movingShapeMoveIndex][i + 1] +=
                    translateY;
            }
        }
    }
}
