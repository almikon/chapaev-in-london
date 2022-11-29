import { Vector } from './Vector';

export class GameInteraction {
  mousePosition: Vector = new Vector(0, 0);
  mouseDown = false;
  mouseUp = false;

  reset = () => {
    this.mouseDown = false;
    this.mouseUp = false;
  };
}
