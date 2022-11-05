function isNumber(x: any): x is number {
  return typeof x === 'number';
}

export class Vector {
  static readonly NullVector = new Vector(0, 0);

  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get x() {
    return this._x;
  }

  public set x(val) {
    this._x = val;
  }

  public get y() {
    return this._y;
  }

  public set y(val) {
    this._y = val;
  }

  public add(other: Vector | number) {
    if (isNumber(other)) {
      return new Vector(this.x + other, this.y + other);
    }
    return new Vector(this.x + other.x, this.y + other.y);
  }

  public sub(other: Vector | number) {
    if (isNumber(other)) {
      return new Vector(this.x - other, this.y - other);
    }
    return new Vector(this.x - other.x, this.y - other.y);
  }

  public mul(other: Vector | number) {
    if (isNumber(other)) {
      return new Vector(this.x * other, this.y * other);
    }
    return new Vector(this.x * other.x, this.y * other.y);
  }

  public div(other: Vector | number) {
    if (isNumber(other)) {
      return new Vector(this.x / other, this.y / other);
    }
    return new Vector(this.x / other.x, this.y / other.y);
  }

  public sign() {
    return new Vector(Math.sign(this.x), Math.sign(this.y));
  }

  public direction() {
    return this.div(this.magnutude());
  }

  public abs() {
    return new Vector(Math.abs(this.x), Math.abs(this.y));
  }

  public sqrt() {
    return new Vector(Math.sqrt(this.x), Math.sqrt(this.y));
  }

  public max(other: Vector | number) {
    if (isNumber(other)) {
      return new Vector(Math.max(this.x, other), Math.max(this.y, other));
    }
    return new Vector(Math.max(this.x, other.x), Math.max(this.y, other.y));
  }

  public min(other: Vector | number) {
    if (isNumber(other)) {
      return new Vector(Math.min(this.x, other), Math.min(this.y, other));
    }
    return new Vector(Math.min(this.x, other.x), Math.min(this.y, other.y));
  }

  public pow(n: number) {
    return new Vector(Math.pow(this.x, n), Math.pow(this.y, n));
  }

  public equals(other: Vector) {
    return other.x === this.x && other.y === this.y;
  }

  public magnutude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  public dotProduct(other: Vector) {
    return this.x * other.x + this.y * other.y;
  }

  public toString() {
    return `X: ${this.x}; Y: ${this.y}`;
  }

  public distanceTo(other: Vector) {
    return this.sub(other).magnutude();
  }

  public rotate(angle: number) {
    return new Vector(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle),
    );
  }
}
