// Misc functions
function hexToRgb(hex) {
    // parse the hex string
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
    ];
}

function pointIsInPoly(p, polygon) {
    var isInside = false;
    var minX = polygon[0].x,
        maxX = polygon[0].x;
    var minY = polygon[0].y,
        maxY = polygon[0].y;
    for (var n = 1; n < polygon.length; n++) {
        var q = polygon[n];
        minX = Math.min(q.x, minX);
        maxX = Math.max(q.x, maxX);
        minY = Math.min(q.y, minY);
        maxY = Math.max(q.y, maxY);
    }

    if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
        return false;
    }

    var i = 0,
        j = polygon.length - 1;
    for (i, j; i < polygon.length; j = i++) {
        if (
            polygon[i].y > p.y != polygon[j].y > p.y &&
            p.x <
                ((polygon[j].x - polygon[i].x) * (p.y - polygon[i].y)) /
                    (polygon[j].y - polygon[i].y) +
                    polygon[i].x
        ) {
            isInside = !isInside;
        }
    }

    return isInside;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function pDistance(x, y, x1, y1, x2, y2) {
    // src: https://stackoverflow.com/a/6853926
    var A = x - x1;
    var B = y - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = -1;
    if (len_sq != 0)
        //in case of 0 length line
        param = dot / len_sq;

    var xx, yy;

    if (param < 0) {
        // closest point is the P1(x1,y1)
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        // closest point is the P2(x2,y2)
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    var dx = x - xx;
    var dy = y - yy;
    return [Math.sqrt(dx * dx + dy * dy), param];
}

function getMousePosition(e) {
    var rect = e.target.getBoundingClientRect();
    // Normalize mouse position
    var x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var y = ((e.clientY - rect.top) / rect.height) * -2 + 1;

    return [x, y];
}

function findVertex(x_down, y_down) {
    // Check for rectangle
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
                    0.05) &
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
                // return type of the shape and index of the shape
                return ["square", i, p];
            }
        }
    }
}
