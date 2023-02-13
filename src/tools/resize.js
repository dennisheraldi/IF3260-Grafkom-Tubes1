function resizeButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Resize";
    canvas.style.cursor = "default";
    canvas.onmousedown = resizeMouseDownHandler;
    canvas.onmousemove = resizeMouseMoveHandler;
}

function resizeMouseDownHandler(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x_down = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y_down = ((e.clientY - rect.top) / rect.height) * -2 + 1;

    if (!mouseMoveResize) {
        // check if the mouse is near the side of the rectangle
        for (var i = 0; i < object.rectangle.positions.length; i++) {
            var position = object.rectangle.positions[i];
            for (var p = 0; p < 4; p++) {
                x1 = position[(p * 2) % 8];
                y1 = position[(p * 2 + 1) % 8];
                x2 = position[(p * 2 + 2) % 8];
                y2 = position[(p * 2 + 3) % 8];
                if (pDistance(x_down, y_down, x1, y1, x2, y2)[0] < 0.01) {
                    resizePosition.push(object.rectangle.positions[i]);
                    resizeRectangleIndex = i;
                    resizeLineIndex = [(p * 2) % 8, (p * 2 + 2) % 8];
                }
            }
        }
    } else {
        // finish resizing
        mouseMoveResize = false;
        object.rectangle.positions.push([...resizePosition]);
        resizePosition = [];
        resizeRectangleIndex = -1;
        resizeLineIndex = [];
    }
}

function resizeMouseMoveHandler(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x_move = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y_move = ((e.clientY - rect.top) / rect.height) * -2 + 1;
}
