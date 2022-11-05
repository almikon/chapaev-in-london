import { Vector } from './Vector';
import { nanoid } from 'nanoid';

export class Checker {
  private _position: Vector;
  private _velocity: Vector;
  private _radius: number;
  private _mass: number;
  private _id: string;
  private _selected: boolean;
  private _playerId: number;

  public get playerId(): number {
    return this._playerId;
  }
  public set playerId(value: number) {
    this._playerId = value;
  }

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    this._selected = value;
  }

  public get id(): string {
    return this._id;
  }

  public get radius(): number {
    return this._radius;
  }
  public set radius(value: number) {
    this._radius = value;
  }

  public get position(): Vector {
    return this._position;
  }
  public set position(value: Vector) {
    this._position = value;
  }

  public get velocity(): Vector {
    return this._velocity;
  }

  public set velocity(value: Vector) {
    this._velocity = value;
  }

  public get mass(): number {
    return this._mass;
  }
  public set mass(value: number) {
    this._mass = value;
  }

  constructor(
    position: Vector,
    radius: number,
    mass: number,
    teamId: number,
    startingVelocity: Vector = Vector.NullVector,
  ) {
    this._position = position;
    this._velocity = startingVelocity;
    this._radius = radius;
    this._mass = mass;
    this._id = nanoid();
    this._playerId = teamId;
    this._selected = false;
  }

  contains(point: Vector) {
    return this.position.sub(point).magnutude() <= this.radius;
  }

  collides(other: Checker) {
    if (this === other) {
      return false;
    }
    const distance = this.position.sub(other.position).magnutude();
    if (distance < this.radius + other.radius) {
      return true;
    }
  }

  getVelocityAfterCollision(other: Checker) {
    /*
                The formulas were taken from
                https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional
            */

    const velocity = this.velocity.sub(
      this.position
        .sub(other.position)
        .mul(this.velocity.sub(other.velocity).dotProduct(this.position.sub(other.position)))
        .div(this.position.sub(other.position).magnutude() ** 2)
        .mul((2 * other.mass) / (this.mass + other.mass)),
    );

    return velocity;
  }

  move(dt: number, frictionKoeff = 0): Checker {
    if (this.velocity.magnutude() < this.radius / 10) {
      this.velocity = Vector.NullVector;
    }
    if (this.velocity.equals(Vector.NullVector)) {
      return this;
    }
    const direction = this.velocity.sign();
    const velocitySquared = this.velocity.mul(this.velocity);
    let kineticEnergy = velocitySquared.mul(this.mass).mul(0.5);
    const powerLoss = velocitySquared.mul(dt).mul(frictionKoeff).mul(9.8); // kinetic energy delta = - k * g * v * v * t
    kineticEnergy = kineticEnergy.sub(powerLoss);
    this.velocity = kineticEnergy.mul(2).div(this.mass).sqrt().mul(direction); // backward conversion of energy to velocity
    this.position = this.velocity.mul(dt).add(this.position); // S = V*t
    return this;
  }
}
