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
        squarePosition.push(x_down, y_down);
        // add the color to the squareColor
        squareColor.push(...currentColor);
    } else {
        // finish drawing
        mouseMoveDrawSquare = false;
        object.square.positions.push([...squarePosition]);
        object.square.colors.push([...squareColor]);
        squarePosition = [];
        squareColor = [];
    }
}

function squareMouseMoveHandler(e) {
    x_move = getMousePosition(e)[0];
    y_move = getMousePosition(e)[1];

    x_0 = squarePosition[0];
    y_0 = squarePosition[1];

    kx = x_move >= x_0 ? 1 : -1;
    ky = y_move >= y_0 ? 1 : -1;

    radius = x_move <= y_move ? Math.abs(x_move - x_0) : Math.abs(y_move - y_0);

    if (!mouseMoveDrawSquare && squarePosition.length == 2) {
        mouseMoveDrawSquare = true;

        // prettier-ignore
        squarePosition.push( 
            x_0 + kx * radius, y_0,
            x_0 + kx * radius, y_0 + ky * radius,
            x_0, y_0 + ky * radius,
        );
        // prettier-ignore
        squareColor.push( 
            ...currentColor,
            ...currentColor,
            ...currentColor,
        );
    } else if (mouseMoveDrawSquare) {
        // each time mouse move, update the square
        squarePosition[2] = x_0 + kx * radius;
        squarePosition[4] = x_0 + kx * radius;
        squarePosition[5] = y_0 + ky * radius;
        squarePosition[7] = y_0 + ky * radius;
    }
}
