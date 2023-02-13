function fillButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Fill";
    canvas.style.cursor = "pointer";
    canvas.onmousedown = fillMouseDownHandler;
}

function fillMouseDownHandler(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x_down = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y_down = ((e.clientY - rect.top) / rect.height) * -2 + 1;

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
}
