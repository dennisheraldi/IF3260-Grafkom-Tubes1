// class Model {
//     constructor(gl) {
//         this.gl = gl;
//         this.line = [];
//         this.square = [];
//         this.rectangle = [];
//         this.polygon = [];
//     }
//     addRectangle(rectangle) {
//         this.rectangle.push(rectangle);
//     }
//     drawRectangle() {
//         for (let i = 0; i < this.rectangle.length; i++) {
//             if (this.rectangle[i].getSize() == 4) {
//                 for (let j = 0; j < this.rectangle[i].getSize(); j++) {
//                     setPositionColorBuffer(
//                         this.rectangle[i].getVertexPosition(j),
//                         this.rectangle[i].getVertexColor(j)
//                     );
//                     gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
//                 }
//             }
//         }
//     }
//     reset() {
//         this.line = [];
//         this.square = [];
//         this.rectangle = [];
//         this.polygon = [];
//     }
// }

// class Shape {
//     constructor() {
//         this.vertex = [];
//     }
//     addVertex(vertex) {
//         this.vertex.push(vertex);
//     }
//     getVertex(index) {
//         return this.vertex[index];
//     }
//     getVertexPosition(index) {
//         return this.vertex[index].getPosition();
//     }
//     getVertexColor(index) {
//         return this.vertex[index].getColor();
//     }
//     newVertex(x, y, r, g, b) {
//         this.vertex.push(new Vertex(x, y, r, g, b));
//     }
//     setVertexPosition(index, position) {
//         this.vertex[index].setPosition(position);
//     }
//     setVertexColor(index, color) {
//         this.vertex[index].setColor(color);
//     }
//     getSize() {
//         return this.vertex.length;
//     }
// }

// class Vertex {
//     constructor(x, y, r, g, b) {
//         this.x = x;
//         this.y = y;
//         this.r = r;
//         this.g = g;
//         this.b = b;
//     }
//     getPosition() {
//         return [this.x, this.y];
//     }
//     getColor() {
//         return [this.r, this.g, this.b];
//     }
//     setPosition(position) {
//         this.x = position[0];
//         this.y = position[1];
//     }
//     setColor(color) {
//         this.r = color[0];
//         this.g = color[1];
//         this.b = color[2];
//     }
// }

// class Rectangle extends Shape {
//     constructor() {
//         super();
//     }
// }
