import { Vector } from './Vector';

export class Particle {
  private _position: Vector;
  private _velocity: Vector;
  private _radius: number;
  private _alpha: number;
  _color: string;
  public get alpha(): number {
    return this._alpha;
  }
  private _ctx: CanvasRenderingContext2D;
  constructor(
    ctx: CanvasRenderingContext2D,
    position: Vector,
    radius: number,
    color: string,
    startingVelocity: Vector = Vector.NullVector,
  ) {
    this._ctx = ctx;
    this._position = position;
    this._velocity = startingVelocity;
    this._radius = radius;
    this._color = color;
    this._alpha = 1;
  }

  draw() {
    const prevAlpha = this._ctx.globalAlpha;
    this._ctx.globalAlpha = this._alpha;
    this._ctx.fillStyle = this._color;
    this._ctx.beginPath();

    this._ctx.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2, false);

    this._ctx.fill();
    this._ctx.globalAlpha = prevAlpha;
  }

  update() {
    this._alpha -= 0.01;
    this._position = this._position.add(this._velocity);
  }
}
