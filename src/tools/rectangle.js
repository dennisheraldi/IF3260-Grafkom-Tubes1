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
        // rectanglePosition.push(x_down, y_down);
        // add the color to the rectangleColor
        // rectangleColor.push(...currentColor);
        state.staticModel.addRectangle(new Rectangle());
        state.staticModel.rectangle[0].newVertex(
            x_down,
            y_down,
            ...state.currentColor
        );
        console.log("cond 1");
    } else {
        // finish drawing
        // mouseMoveDrawRectangle = false;
        // object.rectangle.positions.push([...rectanglePosition]);
        // object.rectangle.colors.push([...rectangleColor]);
        // rectanglePosition = [];
        // rectangleColor = [];

        state.mouseMoveDrawRectangle = false;
        model.addRectangle(new Rectangle());
        model.staticModel.reset();
        console.log("cond 2");
    }
}

function rectangleMouseMoveHandler(e) {
    x_move = getMousePosition(e)[0];
    y_move = getMousePosition(e)[1];

    // if (!mouseMoveDrawRectangle && rectanglePosition.length == 2) {
    //     mouseMoveDrawRectangle = true;
    //     // prettier-ignore
    //     rectanglePosition.push( // fill the other 3 points
    //         x_move,rectanglePosition[1],
    //         x_move,y_move,
    //         rectanglePosition[0],y_move,
    //     );
    //     // prettier-ignore
    //     rectangleColor.push( // fill the other 3 points
    //         ...currentColor,
    //         ...currentColor,
    //         ...currentColor,
    //     );
    // } else if (mouseMoveDrawRectangle) {
    //     // each time mouse move, update the rectangle
    //     rectanglePosition[2] = x_move;
    //     rectanglePosition[4] = x_move;
    //     rectanglePosition[5] = y_move;
    //     rectanglePosition[7] = y_move;
    // }

    if (
        !state.mouseMoveDrawRectangle
        // && state.staticModel.rectangle[0].size() == 2
    ) {
        x_start = state.staticModel.rectangle[0].getVertex(0).x;
        y_start = state.staticModel.rectangle[0].getVertex(0).y;
        state.mouseMoveDrawRectangle = true;
        state.staticModel.rectangle[0].addVertex(
            new Vertex(x_move, y_start, ...state.currentColor)
        );
        state.staticModel.rectangle[0].addVertex(
            new Vertex(x_move, y_move, ...state.currentColor)
        );
        state.staticModel.rectangle[0].addVertex(
            new Vertex(x_start, y_move, ...state.currentColor)
        );
        console.log("cond 4");
    } else if (mouseMoveDrawRectangle) {
        // each time mouse move, update the rectangle
        state.staticModel.rectangle[0].getVertex(0).y = x_move;
        state.staticModel.rectangle[0].getVertex(1).y = x_move;
        state.staticModel.rectangle[0].getVertex(2).x = y_move;
        state.staticModel.rectangle[0].getVertex(3).x = y_move;
        console.log("cond 3");
    }
}
