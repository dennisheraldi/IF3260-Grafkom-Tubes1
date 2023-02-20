function rotateButtonHandler(){
    document.getElementById("selected-tool").innerHTML = "Move";
    canvas.style.cursor = "default";
    canvas.onmousemove = moveMouseMoveHandler;
    canvas.onmousedown = moveMouseDownHandler;

    let place = document.getElementById("list-object");

    //clear place
    while (place.firstChild) {
        place.removeChild(place.firstChild);
    }

    //store object to be rotated
    console.log(object);
    const objects = [];

    for (const shape in object) {
    const { positions } = object[shape];
        for (let i = 0; i < positions.length; i++) {
            objects.push({ shape, position: positions[i] , index: i+1});
        }
    }
    console.log(objects)

    //create element for each object
    let elements = [];
    
    objects.forEach((e) => {
        const name = e.shape + " " + e.index;
        let lbl = document.createElement("label");
        lbl.setAttribute("id", "label" + e.index);
        lbl.innerHTML = name + " degree of rotation";
        let inp = document.createElement("input");
        inp.setAttribute("id", "input" + e.shape + e.index);
        inp.setAttribute("type", "text");
        inp.setAttribute("min", "-360");
        inp.setAttribute("max", "360");
        inp.value = 0;
        elements.push(lbl, inp);
    });

    //show element to object list
    let btn = document.createElement("button");
    btn.innerHTML = "rotate";
    elements.push(btn);
    elements.push(btn);
    let br = document.createElement("br");
    br.setAttribute("class", "edit");
    elements.forEach((e) => {
        e.setAttribute("class", "edit");
        place.appendChild(e);
        place.appendChild(br.cloneNode());
    });

    //rotate object with degree input 

    
    
    btn.onclick = () => {
        let lines = [];
        let squares = [];
        let rectangles = [];
        let polygons = [];

        objects.forEach((e) => {
            let inp = document.getElementById("input" + e.shape + e.index);
            let deg = inp.value;
            let pos = object[e.shape].positions[e.index - 1];
            switch (e.shape) {
                case "line":
                    lines.push(rotateLine(pos, deg));
                    break;
                case "square":
                    squares.push(rotateSquare(pos, deg));
                    break;
                case "rectangle":
                    rectangles.push(rotateRectangle(pos, deg));
                    break;
                case "polygon":
                    polygons.push(rotatePolygon(pos, deg));
                    break;
            }
        });
        object.square.positions = squares;
        object.line.positions = lines;
        object.rectangle.positions = rectangles;
        object.polygon.positions = polygons;

        console.log(object);
    }

}

function rotateLine(linePosition, degreeOfRotation){
  let x1 = linePosition[0];
  let y1 = linePosition[1];
  let x2 = linePosition[2];
  let y2 = linePosition[3];

  // find center
  let cx = (x1 + x2) / 2;
  let cy = (y1 + y2) / 2;

  // convert degrees to radians
  let rad = degreeOfRotation * Math.PI / 180;

  // find new point
  let x1_ = cx + (x1 - cx) * Math.cos(rad) - (y1 - cy) * Math.sin(rad);
  let y1_ = cy + (x1 - cx) * Math.sin(rad) + (y1 - cy) * Math.cos(rad);
  let x2_ = cx + (x2 - cx) * Math.cos(rad) - (y2 - cy) * Math.sin(rad);
  let y2_ = cy + (x2 - cx) * Math.sin(rad) + (y2 - cy) * Math.cos(rad);

  return [x1_, y1_, x2_, y2_];
}

function rotateSquare(squarePosition, degreeOfRotation) {
  // Convert degreeOfRotation to radians
  const radian = degreeOfRotation * (Math.PI / 180);
  // Calculate the center point of the square
  const centerX = (squarePosition[0] + squarePosition[4]) / 2;
  const centerY = (squarePosition[1] + squarePosition[5]) / 2;
  // Iterate over the x and y coordinates in squarePosition
  for (let i = 0; i < squarePosition.length; i += 2) {
    const x = squarePosition[i];
    const y = squarePosition[i + 1];
    // Translate the square to the origin
    const translatedX = x - centerX;
    const translatedY = y - centerY;
    // Rotate the square
    const rotatedX = translatedX * Math.cos(radian) - translatedY * Math.sin(radian);
    const rotatedY = translatedX * Math.sin(radian) + translatedY * Math.cos(radian);
    // Translate the square back to its original position
    squarePosition[i] = rotatedX + centerX;
    squarePosition[i + 1] = rotatedY + centerY;
  }
  return [...squarePosition];
}


function rotateRectangle(rectanglePosition, degreeOfRotation) {
  // Calculate the center point of the rectangle
  const centerX = (rectanglePosition[0] + rectanglePosition[2] + rectanglePosition[4] + rectanglePosition[6]) / 4;
  const centerY = (rectanglePosition[1] + rectanglePosition[3] + rectanglePosition[5] + rectanglePosition[7]) / 4;

  // Convert degreeOfRotation to radians
  const radians = degreeOfRotation * Math.PI / 180;

  // Perform the rotation on each point of the rectangle around the center point
  for (let i = 0; i < rectanglePosition.length; i += 2) {
    const x = rectanglePosition[i];
    const y = rectanglePosition[i + 1];
    const xNew = centerX + (x - centerX) * Math.cos(radians) - (y - centerY) * Math.sin(radians);
    const yNew = centerY + (x - centerX) * Math.sin(radians) + (y - centerY) * Math.cos(radians);
    rectanglePosition[i] = xNew;
    rectanglePosition[i + 1] = yNew;
  }

  return [...rectanglePosition];
}

function rotatePolygon(polygonPosition, degreeOfRotation) {
  // Convert degree of rotation to radians
  var radians = degreeOfRotation * Math.PI / 180;

  // Get the center point of the polygon
  var centerX = 0, centerY = 0;
  for (var i = 0; i < polygonPosition.length; i += 2) {
    centerX += polygonPosition[i];
    centerY += polygonPosition[i + 1];
  }
  centerX /= polygonPosition.length / 2;
  centerY /= polygonPosition.length / 2;

  // Rotate each point around the center point
  var rotatedPolygonPosition = [];
  for (var i = 0; i < polygonPosition.length; i += 2) {
    var x = polygonPosition[i] - centerX;
    var y = polygonPosition[i + 1] - centerY;
    var xRotated = x * Math.cos(radians) - y * Math.sin(radians);
    var yRotated = x * Math.sin(radians) + y * Math.cos(radians);
    rotatedPolygonPosition.push(xRotated + centerX, yRotated + centerY);
  }
  return rotatedPolygonPosition;
}
