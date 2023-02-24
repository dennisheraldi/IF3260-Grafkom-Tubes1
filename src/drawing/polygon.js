var mouseMoveDrawPolygon = false;
var polygonPosition = [];
var polygonColor = [];
var currentPolygonVertex = 0;
var polygonVertex = document.getElementById("polygon-vertex").value;
var isPolygonConvexHull = false;

function polygonConvexHullHandler() {
    isPolygonConvexHull = document.getElementById("convex-hull").checked;
}

function polygonVertexHandler() {
    polygonVertex = document.getElementById("polygon-vertex").value;
}

function polygonButtonHandler() {
    document.getElementById("selected-tool").innerHTML = "Polygon";
    canvas.style.cursor = "crosshair";
    canvas.onmousedown = polygonMouseDownHandler;
    canvas.onmousemove = polygonMouseMoveHandler;
}

function polygonMouseDownHandler(e) {
    var x_down = getMousePosition(e)[0];
    var y_down = getMousePosition(e)[1];

    if (!mouseMoveDrawPolygon && currentPolygonVertex < polygonVertex - 1) {
        // start drawing
        // add the first point to the polygonPosition
        polygonPosition.push(x_down, y_down);
        // add the color to the polygonColor
        polygonColor.push(...currentColor);
        currentPolygonVertex++;
    }
    if (mouseMoveDrawPolygon && currentPolygonVertex < polygonVertex - 1) {
        mouseMoveDrawPolygon = false;
        polygonPosition[polygonPosition.length - 2] = x_down;
        polygonPosition[polygonPosition.length - 1] = y_down;
        currentPolygonVertex++;
    } else if (currentPolygonVertex == polygonVertex - 1) {
        // finish drawing
        currentPolygonVertex++;
        mouseMoveDrawPolygon = false;
        if (isPolygonConvexHull) {
            polygonPosition = convexHull(polygonPosition);
            // color filling
            polygonColor = [];
            for (var i = 0; i < polygonPosition.length / 2; i++) {
                polygonColor.push(...currentColor);
            }
        }
        object.polygon.positions.push([...polygonPosition]);
        object.polygon.colors.push([...polygonColor]);
        polygonPosition = [];
        polygonColor = [];
        currentPolygonVertex = 0;
    }
}

function polygonMouseMoveHandler(e) {
    var x_move = getMousePosition(e)[0];
    var y_move = getMousePosition(e)[1];

    if (
        !mouseMoveDrawPolygon &&
        polygonPosition.length == 2 * currentPolygonVertex &&
        currentPolygonVertex != 0
    ) {
        mouseMoveDrawPolygon = true;
        // prettier-ignore
        polygonPosition.push( // fill the other 3 points
            x_move,
            y_move
        );
        // prettier-ignore
        polygonColor.push( // fill the other 3 points
            ...currentColor,
        );
    } else if (mouseMoveDrawPolygon) {
        // each time mouse move, update the polygon
        polygonPosition[polygonPosition.length - 2] = x_move;
        polygonPosition[polygonPosition.length - 1] = y_move;
    }
}

function convexHull(array_points) {
    var points = [];
    for (var i = 0; i < array_points.length; i++) {
        points.push([array_points[i * 2], array_points[i * 2 + 1]]);
    }

    // Sort the points lexicographically (by x-coordinate, then y-coordinate)
    points.sort(function (a, b) {
        return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
    });

    // Define helper functions for calculating cross product and squared Euclidean distance
    function crossProduct(p, q, r) {
        return (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
    }
    function euclideanDistanceSquared(p, q) {
        return Math.pow(q[0] - p[0], 2) + Math.pow(q[1] - p[1], 2);
    }

    // Initialize the upper and lower hulls
    var upperHull = [points[0], points[1]];
    var lowerHull = [points[0], points[1]];

    // Compute the upper and lower hulls
    for (var i = 2; i < points.length; i++) {
        while (
            upperHull.length >= 2 &&
            crossProduct(
                upperHull[upperHull.length - 2],
                upperHull[upperHull.length - 1],
                points[i]
            ) <= 0
        ) {
            upperHull.pop();
        }
        upperHull.push(points[i]);
        while (
            lowerHull.length >= 2 &&
            crossProduct(
                lowerHull[lowerHull.length - 2],
                lowerHull[lowerHull.length - 1],
                points[i]
            ) >= 0
        ) {
            lowerHull.pop();
        }
        lowerHull.push(points[i]);
    }

    // Combine the upper and lower hulls to form the convex hull
    points = lowerHull
        .slice(0, lowerHull.length - 1)
        .concat(upperHull.reverse().slice(1));

    var convex_hull = [];
    for (var i = 0; i < points.length; i++) {
        convex_hull.push(points[i][0], points[i][1]);
    }
    return convex_hull;
}
