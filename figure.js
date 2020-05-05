class Point {
  constructor (x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
  }
}

class Figure {
  constructor() {
    if (this.constructor === Figure)
      throw new Error('Cannot create instance of abstract class Figure');
  }

  getType(type) { return console.log(`Type: ${type}`); }
  getPerimeter(perimeter) { return console.log(`Perimeter: ${perimeter}`); }
  getSquare(square) { return console.log(`Square: ${square}`); }
}

class Circle extends Figure {
  constructor(point, radius) {
    super();
    this.point = point;
    this.radius = radius;
  }

  getType() { return super.getType('Circle') }
  getPerimeter() { return super.getPerimeter(round(this.radius * 2 * 3.14)); }
  getSquare() { return super.getSquare(round(this.radius ** 2 * 3.14)); }
}

class Triangle extends Figure {
  constructor (pointA, pointB, pointC) {
    super();
    this.AB = findDistance(pointA, pointB);
    this.BC = findDistance(pointB, pointC);
    this.AC = findDistance(pointA, pointC);
    this.perimeter = round(this.AB + this.BC + this.AC);
  }

  getType(type = 'Triangle') { return super.getType(type); }
  getPerimeter() { return super.getPerimeter(this.perimeter); }
  getSquare () {
    const halfPerimeter = this.perimeter / 2;
    return super.getSquare(round(Math.sqrt(halfPerimeter *
      (halfPerimeter - this.AB) * (halfPerimeter - this.BC) *
      (halfPerimeter - this.AC))));
  }
}

class IsoscelesTriangle extends Triangle {
  constructor(pointA, pointB, pointC) { super(pointA, pointB, pointC); }
  getType() { return super.getType('Isosceles triangle'); }
}

class EquilateralTriangle extends Triangle {
  constructor(pointA, pointB, pointC) { super(pointA, pointB, pointC); }
  getType () { return super.getType('Equilateral triangle'); }
}

class RightTriangle extends Triangle {
  constructor(pointA, pointB, pointC) { super(pointA, pointB, pointC); }
  getType () { return super.getType('Right triangle'); }
}

class Quadrangle extends Figure {
  constructor (pointA, pointB, pointC, pointD) {
    super();
    this.AB = findDistance(pointA, pointB);
    this.BC = findDistance(pointB, pointC);
    this.CD = findDistance(pointC, pointD);
    this.AD = findDistance(pointA, pointD);
    this.AC = findDistance(pointA, pointC);
    this.BD = findDistance(pointB, pointD);
    this.perimeter = round(this.AB + this.BC + this.CD + this.AD);
  }

  getType(type = 'Quadrangle') { return super.getType(type); }
  getPerimeter() { return super.getPerimeter(this.perimeter); }

  getSquare() {
    const halfPerimeter = this.perimeter / 2;
    return super.getSquare(round(Math.sqrt((halfPerimeter - this.AB) *
      (halfPerimeter - this.BC) * (halfPerimeter - this.CD) *
      (halfPerimeter - this.AD))));
  }
}

class Rectangle extends Quadrangle {
  constructor(pointA, pointB, pointC, pointD) {
    super(pointA, pointB, pointC, pointD);
  }
  getType () { return super.getType('Rectangle'); }
}

class Rhombus extends Quadrangle {
  constructor(pointA, pointB, pointC, pointD) {
    super(pointA, pointB, pointC, pointD);
  }
  getType () { return super.getType('Rhombus'); }
}

class Square extends Rhombus {
  constructor (pointA, pointB, pointC, pointD) {
    super(pointA, pointB, pointC, pointD);
  }

  getType () { return console.log('Type: Square'); }
}

function round(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

function findDistance(point1, point2) {
  return Math.sqrt(((point2.x - point1.x) ** 2) +
    ((point2.y - point1.y) ** 2));
}

function triangleHandler(...args) {
  const triangle = new Triangle(...args);
  const sides = [triangle.AB, triangle.BC, triangle.AC]
    .sort((a, b) => a - b);
  const AB = round(triangle.AB);
  const BC = round(triangle.BC);
  const AC = round(triangle.AC);

  if (AB === BC && AB === AC)
    return new EquilateralTriangle(...args);

  if (AB === BC || BC === AC || AB === AC)
    return new IsoscelesTriangle(...args);

  if(round(sides[2] ** 2) === round(sides[1] ** 2)
    + round(sides[0] ** 2))
    return new RightTriangle(...args);

  return triangle;
}

function quadrangleHandler(...args) {
  const quadrangle = new Quadrangle(...args);
  const AB = round(quadrangle.AB);
  const BC = round(quadrangle.BC);
  const CD = round(quadrangle.CD);
  const AD = round(quadrangle.AD);
  const AC = round(quadrangle.AC);
  const BD = round(quadrangle.BD);

  if (AB === BC && AB === CD && AB === AD && AC !== BD)
    return new Rhombus(...args);

  if(AB === CD && AD === BC && AB !== BC)
    return new Rectangle(...args);

  if (AB === BC && AB === CD && AB === AD && AC === BD)
    return new Square(...args);

  return new Quadrangle(...args);
}

function figureFactory(...params) {
  switch(params.length) {
    case 2: return new Circle(...params);
    case 3: return triangleHandler(...params);
    case 4: return quadrangleHandler(...params);
    default: throw new Error('Invalid arguments');
  }
}

////////////////////////////////////////////////////////////////////////////////
//                                Tests
////////////////////////////////////////////////////////////////////////////////

// Circle
const pointO = new Point (0, 0, 'O');

const circle = figureFactory(pointO, 5);
circle.getType();
circle.getPerimeter();
circle.getSquare();

// Triangle
const pointA = new Point(0, 0, 'A');
const pointB = new Point(0, 2, 'B');
const pointC = new Point(4, -4, 'C');

const triangle = figureFactory(pointA, pointB, pointC);
triangle.getType();
triangle.getPerimeter();
triangle.getSquare();

// Ravnobedrenniy Triangle
const pointA1 = new Point(0, 3, 'A');
const pointB1 = new Point(-2, -3, 'B');
const pointC1 = new Point(6, 1, 'C');

const isoscelesTriangle = figureFactory(pointA1, pointB1, pointC1);
isoscelesTriangle.getType();
isoscelesTriangle.getPerimeter();
isoscelesTriangle.getSquare();

// Ravnostoronniy Triangle
const pointA2 = new Point(-0.866, -0.5, 'A');
const pointB2 = new Point(0.866, -0.5, 'B');
const pointC2 = new Point(0.0, 1.0, 'C');

const equilateralTriangle = figureFactory(pointA2, pointB2, pointC2);
equilateralTriangle.getType();
equilateralTriangle.getPerimeter();
equilateralTriangle.getSquare();

// Priamougolniy Triangle
const pointA3 = new Point(0, 0, 'A');
const pointB3 = new Point(0, 5, 'B');
const pointC3 = new Point(8, 0, 'C');

const rightTriangle = figureFactory(pointA3, pointB3, pointC3);
rightTriangle.getType();
rightTriangle.getPerimeter();
rightTriangle.getSquare();

// Quadrangle
const pointA4 = new Point(0, 8);
const pointB4 = new Point(3, 14);
const pointC4 = new Point(15, 0);
const pointD4 = new Point(2, -1);

const quadrangle = figureFactory(pointA4, pointB4, pointC4, pointD4);
quadrangle.getType();
quadrangle.getPerimeter();
quadrangle.getSquare();

// Rectangle
const pointA5 = new Point(0, 0, 'A');
const pointB5 = new Point(0, 4, 'B');
const pointC5 = new Point(10, 4, 'C');
const pointD5 = new Point(10, 0, 'D');

const rectangle = figureFactory(pointA5, pointB5, pointC5, pointD5);
rectangle.getType();
rectangle.getPerimeter();
rectangle.getSquare();


// Rhombus
const pointA6 = new Point(-10, 0, 'A');
const pointB6 = new Point(0, 3, 'B');
const pointC6 = new Point(10, 0, 'C');
const pointD6 = new Point(0, -3, 'D');

const rhombus = figureFactory(pointA6, pointB6, pointC6, pointD6);
rhombus.getType();
rhombus.getPerimeter();
rhombus.getSquare();


// Square
const pointA7 = new Point(0, 0, 'A');
const pointB7 = new Point(0, 3, 'B');
const pointC7 = new Point(3, 3, 'C');
const pointD7 = new Point(3, 0, 'D');

const square = figureFactory(pointA7, pointB7, pointC7, pointD7);
square.getType();
square.getPerimeter();
square.getSquare();
