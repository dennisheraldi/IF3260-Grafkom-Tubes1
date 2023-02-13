function lineButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Line";
    canvas.style.cursor = "crosshair";
    canvas.onmousedown = lineMouseDownHandler;
    canvas.onmousemove = lineMouseMoveHandler;
}

function lineMouseDownHandler(e) {
    var x_down = getMousePosition(e)[0];
    var y_down = getMousePosition(e)[1];

    if (!mouseMoveDrawLine) {
        // start drawing
        // add the first point to the linePosition
        linePosition.push(x_down, y_down);
        // add the color to the lineColor
        lineColor.push(...currentColor);
    } else {
        // finish drawing
        mouseMoveDrawLine = false;
        object.line.positions.push([...linePosition]);
        object.line.colors.push([...lineColor]);
        linePosition = [];
        lineColor = [];
    }
}

function lineMouseMoveHandler(e) {
    var x_move = getMousePosition(e)[0];
    var y_move = getMousePosition(e)[1];

    if (!mouseMoveDrawLine && linePosition.length == 2) {
        mouseMoveDrawLine = true;
        // prettier-ignore
        linePosition.push( // fill the other 2 points
            x_move,y_move,
        );
        // prettier-ignore
        lineColor.push( // fill the other 2 points
            ...currentColor
        );
    } else if (mouseMoveDrawLine) {
        // each time mouse move, update the line
        linePosition[2] = x_move;
        linePosition[3] = y_move;
    }
}
