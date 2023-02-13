function squareButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Square";
    canvas.style.cursor = "crosshair";
    canvas.onmousedown = squareMouseDownHandler;
    canvas.onmousemove = squareMouseMoveHandler;
}

function squareMouseDownHandler(e) {
    x_down = getMousePosition(e)[0];
    y_down = getMousePosition(e)[1];

    if (!mouseMoveDrawSquare) {
        // start drawing
        // add the first point to the squarePosition
        squareCenter.push(x_down, y_down);
    } else {
        // finish drawing
        mouseMoveDrawSquare = false;
        object.square.positions.push([...squarePosition]);
        object.square.colors.push([...squareColor]);
        squareCenter = [];
        squarePosition = [];
        squareColor = [];
    }
}

function squareMouseMoveHandler(e) {
    x_move = getMousePosition(e)[0];
    y_move = getMousePosition(e)[1];

    x_0 = squareCenter[0];
    y_0 = squareCenter[1];

    radius = distance(x_0, y_0, x_move, y_move);

    if (!mouseMoveDrawSquare && squareCenter.length == 2) {
        mouseMoveDrawSquare = true;
        // prettier-ignore
        squarePosition.push( 
            x_0 - radius, y_0 + radius,
            x_0 - radius, y_0 - radius,
            x_0 + radius, y_0 - radius,
            x_0 + radius, y_0 + radius,
        );
        // prettier-ignore
        squareColor.push( 
            ...currentColor,
            ...currentColor,
            ...currentColor,
            ...currentColor,
        );
    } else if (mouseMoveDrawSquare) {
        // each time mouse move, update the square
        squarePosition[0] = x_0 - radius;
        squarePosition[1] = y_0 + radius;
        squarePosition[2] = x_0 - radius;
        squarePosition[3] = y_0 - radius;
        squarePosition[4] = x_0 + radius;
        squarePosition[5] = y_0 - radius;
        squarePosition[6] = x_0 + radius;
        squarePosition[7] = y_0 + radius;
    }
}
