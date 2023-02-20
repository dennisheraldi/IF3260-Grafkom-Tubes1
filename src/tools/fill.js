function fillButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Fill";
    canvas.style.cursor = "pointer";
    canvas.onmousedown = fillMouseDownHandler;
}

function fillMouseDownHandler(e) {
    var x_down = getMousePosition(e)[0];
    var y_down = getMousePosition(e)[1];
    var found = false;

    // check for each line
    for (var i = 0; i < object.line.positions.length; i++) {
        var position = object.line.positions[i];
        // check for each point in the line
        for (var p = 0; p < 2; p++) {
            if (
                distance(x_down, y_down, position[p * 2], position[p * 2 + 1]) <
                0.1
            ) {
                // fill the color for corresponding point
                object.line.colors[i][p * 3] = currentColor[0];
                object.line.colors[i][p * 3 + 1] = currentColor[1];
                object.line.colors[i][p * 3 + 2] = currentColor[2];
                found = true;
                return;
            }
        }
    }

    // check for each square
    for (var i = 0; i < object.square.positions.length; i++) {
        var position = object.square.positions[i];
        // check for each point in the square
        for (var p = 0; p < 4; p++) {
            if (
                (distance(
                    x_down,
                    y_down,
                    position[p * 2],
                    position[p * 2 + 1]
                ) <
                    0.2) &
                pointIsInPoly(
                    {
                        x: x_down,
                        y: y_down,
                    },
                    [
                        { x: position[0], y: position[1] },
                        { x: position[2], y: position[3] },
                        { x: position[4], y: position[5] },
                        { x: position[6], y: position[7] },
                    ]
                )
            ) {
                // fill the color for corresponding point
                object.square.colors[i][p * 3] = currentColor[0];
                object.square.colors[i][p * 3 + 1] = currentColor[1];
                object.square.colors[i][p * 3 + 2] = currentColor[2];
                found = true;
                return;
            }
        }
    }

    // check for each rectangle
    for (var i = 0; i < object.rectangle.positions.length; i++) {
        var position = object.rectangle.positions[i];
        // check for each point in the rectangle
        for (var p = 0; p < 4; p++) {
            if (
                (distance(
                    x_down,
                    y_down,
                    position[p * 2],
                    position[p * 2 + 1]
                ) <
                    0.2) &
                pointIsInPoly(
                    {
                        x: x_down,
                        y: y_down,
                    },
                    [
                        { x: position[0], y: position[1] },
                        { x: position[2], y: position[3] },
                        { x: position[4], y: position[5] },
                        { x: position[6], y: position[7] },
                    ]
                )
            ) {
                // fill the color for corresponding point
                object.rectangle.colors[i][p * 3] = currentColor[0];
                object.rectangle.colors[i][p * 3 + 1] = currentColor[1];
                object.rectangle.colors[i][p * 3 + 2] = currentColor[2];
            }
        }
    }

    // check for each polygon
    for (var i = 0; i < object.polygon.positions.length; i++) {
        var position = object.polygon.positions[i];
        // check for each point in the polygon
        for (var p = 0; p < position.length / 2; p++) {
            if (
                (distance(
                    x_down,
                    y_down,
                    position[p * 2],
                    position[p * 2 + 1]
                ) <
                    0.2) &
                pointIsInPoly(
                    {
                        x: x_down,
                        y: y_down,
                    },
                    [
                        { x: position[0], y: position[1] },
                        { x: position[2], y: position[3] },
                        { x: position[4], y: position[5] },
                        { x: position[6], y: position[7] },
                        { x: position[8], y: position[9] },
                        { x: position[10], y: position[11] },
                        { x: position[12], y: position[13] },
                        { x: position[14], y: position[15] },
                    ]
                )
            ) {
                // fill the color for corresponding point
                object.polygon.colors[i][p * 3] = currentColor[0];
                object.polygon.colors[i][p * 3 + 1] = currentColor[1];
                object.polygon.colors[i][p * 3 + 2] = currentColor[2];
            }
        }
    }
}
