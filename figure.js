class Point {
  constructor (x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
  }
}

class Figure {
  constructor () {
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
  getPerimeter() { return super.getPerimeter(this.radius * 2 * 3.14); }
  getSquare() { return super.getSquare(this.radius ** 2 * 3.14); }
}

class Triangle extends Figure {
  constructor (pointA, pointB, pointC) {
    super();
    this.distanceAB = findDistance(pointA, pointB);
    this.distanceBC = findDistance(pointB, pointC);
    this.distanceAC = findDistance(pointA, pointC);
    this.perimeter = this.distanceAB + this.distanceBC + this.distanceAC;
  }

  getType(type = 'Triangle') { return super.getType(type); }
  getPerimeter() { return super.getPerimeter(this.perimeter); }
  getSquare () {
    const halfPerimeter = this.perimeter / 2;
    return super.getSquare(Math.sqrt(halfPerimeter *
      (halfPerimeter - this.distanceAB) *
      (halfPerimeter - this.distanceBC) *
      (halfPerimeter - this.distanceAC)));
  }
}

class IsoscelesTriangle extends Triangle {
  constructor(pointA, pointB, pointC) { super(pointA, pointB, pointC); }

  getType () {
    if (this.distanceAB === this.distanceBC
      || this.distanceBC === this.distanceAC
      || this.distanceAB === this.distanceAC)
        return super.getType('Isosceles triangle');
    return super.getType();
  }
}

class EquilateralTriangle extends Triangle {
  constructor(pointA, pointB, pointC) { super(pointA, pointB, pointC); }

  getType () {
    if (this.distanceAB === this.distanceBC && this.distanceAB === this.distanceAC)
      return super.getType('Equilateral triangle');
    return super.getType();
  }
}

class RightTriangle extends Triangle {
  constructor(pointA, pointB, pointC) { super(pointA, pointB, pointC); }

  getType () {
    const sides = [this.distanceAB, this.distanceBC, this.distanceAC];
    const hypotenuse = Math.max(...sides);
    let catheters = sides.splice(sides.indexOf(hypotenuse), 1)

    if(hypotenuse ** 2 === catheters[0] ** 2 + catheters[1] ** 2)
      return super.getType('Right triangle')
    return super.getType();
  }
}

class Quadrangle extends Figure {
  constructor (pointA, pointB, pointC, pointD) {
    super();
    this.distanceAB = findDistance(pointA, pointB);
    this.distanceBC = findDistance(pointB, pointC);
    this.distanceCD = findDistance(pointC, pointD);
    this.distanceAD = findDistance(pointA, pointD);
    this.perimeter =
      this.distanceAB + this.distanceBC + this.distanceCD + this.distanceAD;
  }

  getType(type = 'Quadrangle') { return super.getType(type); }
  getPerimeter() { return super.getPerimeter(this.perimeter); }

  getSquare() {
    const halfPerimeter= this.perimeter / 2;
    return super.getSquare(Math.sqrt(
      (halfPerimeter - this.distanceAB) *
      (halfPerimeter - this.distanceBC) *
      (halfPerimeter - this.distanceCD) *
      (halfPerimeter - this.distanceAD)));
  }
}

class Rectangle extends Quadrangle {
  constructor(pointA, pointB, pointC, pointD) {
    super(pointA, pointB, pointC, pointD);
  }

  getType () {
    if (this.distanceAB === this.distanceCD && this.distanceAD === this.distanceBC)
      return super.getType('Rectangle');
    return super.getType();
  }
}

class Rhombus extends Quadrangle {
  constructor(pointA, pointB, pointC, pointD) {
    super(pointA, pointB, pointC, pointD);
    this.distanceAC = findDistance(pointA, pointC);
    this.distanceBD = findDistance(pointB, pointD);
  }

  getType () {
    if (this.distanceAB === this.distanceBC &&
      this.distanceAB === this.distanceCD &&
      this.distanceAB === this.distanceAD &&
      this.distanceAC !== this.distanceBD
    )
      return super.getType('Rhombus');
    return super.getType();
  }
}

class Square extends Rhombus {
  constructor (pointA, pointB, pointC, pointD) {
    super(pointA, pointB, pointC, pointD);
  }

  getType () {
    if (this.distanceAB === this.distanceBC &&
      this.distanceAB === this.distanceCD &&
      this.distanceAB === this.distanceAD &&
      this.distanceAC === this.distanceBD
    )
      return console.log('Type: Square');
    return super.getType();
  }
}

function findDistance(point1, point2) {
  return Math.sqrt(((point2.x - point1.x) ** 2) + ((point2.y - point1.y) ** 2));
}
