function rectangleButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Rectangle";
    canvas.style.cursor = "crosshair";
    canvas.onmousedown = rectangleMouseDownHandler;
    canvas.onmousemove = rectangleMouseMoveHandler;
}

function rectangleMouseDownHandler(e) {
    x_down = getMousePosition(e)[0];
    y_down = getMousePosition(e)[1];

    if (!mouseMoveDrawRectangle) {
        // start drawing
        // add the first point to the rectanglePosition
        rectanglePosition.push(x_down, y_down);
        // add the color to the rectangleColor
        rectangleColor.push(...currentColor);
    } else {
        // finish drawing
        mouseMoveDrawRectangle = false;
        object.rectangle.positions.push([...rectanglePosition]);
        object.rectangle.colors.push([...rectangleColor]);
        rectanglePosition = [];
        rectangleColor = [];
    }
}

function rectangleMouseMoveHandler(e) {
    x_move = getMousePosition(e)[0];
    y_move = getMousePosition(e)[1];

    if (!mouseMoveDrawRectangle && rectanglePosition.length == 2) {
        mouseMoveDrawRectangle = true;
        // prettier-ignore
        rectanglePosition.push( // fill the other 3 points
            x_move,rectanglePosition[1],
            x_move,y_move,
            rectanglePosition[0],y_move,
        );
        // prettier-ignore
        rectangleColor.push( // fill the other 3 points
            ...currentColor,
            ...currentColor,
            ...currentColor,
        );
    } else if (mouseMoveDrawRectangle) {
        // each time mouse move, update the rectangle
        rectanglePosition[2] = x_move;
        rectanglePosition[4] = x_move;
        rectanglePosition[5] = y_move;
        rectanglePosition[7] = y_move;
    }
}
