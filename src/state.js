// HTML elements
const canvas = document.getElementById("canvas")

const btnSelect = document.getElementById("btnSelect")
const btnLine = document.getElementById("btnLine")
const btRectangle = document.getElementById("btnRectangle")
const btnPolygon = document.getElementById("btnPolygon")
const btnFill = document.getElementById("btnFill")
const btnClear = document.getElementById("btnClear")
const color = document.getElementById("color")

// Variable
/** Array of shape */
let shapes = []

/** Current shape */
let currentShape = null

/** Mouse down flag */
let mouseDown = false

/** Current color */
let currentColor = [0,0,1]

/** Current shape id */
let currentShapeId = 0

/** Current shape vertices */
let currentShapeVertices = []

/** Polygon sisi */
let currentPolygonSisi = 0

/** isDrawing */
let isDrawing = false



class Vertex {
  
    /**
    * Constructor
    * @param {number} x - X coordinate
    * @param {number} y - Y coordinate
    * @param {string} color - Color of vertex in rgb, ex [0,0,0]
    */
    constructor (x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
    }
}

class Shape {

  /**
   * Constructor
   * @param {number} id - Shape id
   * @param {string} type - Type of Shape
   * @param {string} shapeName - Name of Shape
   * @param {number[][]} vertices - Vertices in this shape
   */
  constructor (id, type, shapeName, vertices) {
    this.id = id;
    this.type = type;
    this.shapeName = shapeName;
    this.vertices = vertices;
  }
}

class Polygon extends Shape {
  /**
  * Constructor
  * @param {number} id - Shape id
  * @param {string} shapeName - Name of Shape
  * @param {number} sisi - Number of sides
  * @param {number[][]} vertices - Vertices in this shape
  */
  constructor (id, shapeName, sisi, vertices) {
    super(id, "polygon", shapeName, vertices);
    this.sisi = sisi;
  }
}