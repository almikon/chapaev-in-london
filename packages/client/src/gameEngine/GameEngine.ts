import { Checker } from './Checker';
import { GameInteraction } from './GameInteraction';
import { GameStepResult } from './GameStepResult';
import { GameType } from './GameType';
import { Vector } from './Vector';

export class GameEngine {
  public static readonly Dimension = 10;
  public static readonly Margin = this.Dimension * 0.1;
  public static readonly EffectiveDimension = this.Dimension - this.Margin * 2;
  public static readonly CheckerCount = 8;
  public static readonly CheckerRadius = this.EffectiveDimension / 8 / 1.4 / 2;
  public static readonly BoardFriction = 15;
  public static readonly Palyer1Id = 1;
  public static readonly Palyer2Id = 2;
  public static readonly MaxStrikePower = this.CheckerRadius * 5;
  public static readonly StrikePowerToVelocityCoeff = 30;

  private _checkers: Checker[] = [];

  private _selectedChecker: Checker | null = null;
  private _gameType!: GameType;
  public get gameType(): GameType {
    return this._gameType;
  }

  public get checkers(): Checker[] {
    return this._checkers;
  }

  private _userMoveInProgress = false;
  public get userMoveInProgress(): boolean {
    return this._userMoveInProgress;
  }
  public set userMoveInProgress(value: boolean) {
    this._userMoveInProgress = value;
  }
  private _delayInProgress = false;
  private _delaySec = 0;
  private _elapsedSec = 0;

  init = (gameType: GameType) => {
    this._gameType = gameType;

    for (let i = 0; i < GameEngine.CheckerCount; i++) {
      const posBottom = new Vector(
        (i * GameEngine.EffectiveDimension) / GameEngine.CheckerCount +
          GameEngine.EffectiveDimension / GameEngine.CheckerCount / 2 +
          GameEngine.Margin,
        GameEngine.EffectiveDimension / GameEngine.CheckerCount / 2 + GameEngine.Margin,
      );

      const posTop = posBottom.add(
        new Vector(
          0,
          GameEngine.EffectiveDimension - (GameEngine.EffectiveDimension / GameEngine.CheckerCount / 2) * 2,
        ),
      );

      let checker = new Checker(posBottom, GameEngine.CheckerRadius, 40, GameEngine.Palyer1Id);
      this._checkers.push(checker);
      checker = new Checker(posTop, GameEngine.CheckerRadius, 40, GameEngine.Palyer2Id);
      this._checkers.push(checker);
    }

    this._userMoveInProgress = false;
  }

  tick = (dt: number, gameInteraction: GameInteraction) => {
    const result = new GameStepResult();
    if (this._delayInProgress) {
      this._elapsedSec += dt;
      if (this._elapsedSec >= this._delaySec) {
        result.winnerId = this.getWinnerId();
        console.log('Winner id:', result.winnerId);
        this._userMoveInProgress = false;
        this._delayInProgress = false;
        if (result.winnerId === null) {
          this._gameType.handleRoundEnd();
        }
      }
    } else {
      this.handleInteraction(gameInteraction);
      this.moveCheckers(dt);
      this.handleCollisions();
      result.destroyedCheckers = this.removeDestroyedCheckers();
      if (this._userMoveInProgress && this.checkers.every((c) => c.velocity == Vector.NullVector)) {
        this._delayInProgress = true;
        this._delaySec = 1;
        this._elapsedSec = 0;
      }
    }
    return result;
  }

  private getWinnerId = () => {
    const isWinner = (id: number) => this.checkers.every((c) => c.playerId === id);
    if (isWinner(GameEngine.Palyer1Id)) {
      return GameEngine.Palyer1Id;
    }
    if (isWinner(GameEngine.Palyer2Id)) {
      return GameEngine.Palyer2Id;
    }
    return null;
  }

  private removeDestroyedCheckers = () => {
    const destroyed: Checker[] = [];
    this._checkers.forEach((checker, i) => {
      if (
        checker.position.x > GameEngine.Dimension - GameEngine.Margin ||
        checker.position.x < GameEngine.Margin ||
        checker.position.y > GameEngine.Dimension - GameEngine.Margin ||
        checker.position.y < GameEngine.Margin
      ) {
        destroyed.push(checker);
        this._checkers.splice(i, 1);
      }
    });
    return destroyed;
  }

  private handleCollisions = () => {
    const collisions = new Set();
    this._checkers.forEach((checker1) => {
      this._checkers.forEach((checker2) => {
        const collisionId = [checker1.id, checker2.id].sort().join('');
        if (!collisions.has(collisionId)) {
          if (checker1.collides(checker2)) {
            const velocity1 = checker1.getVelocityAfterCollision(checker2);
            const velocity2 = checker2.getVelocityAfterCollision(checker1);
            checker1.velocity = velocity1;
            checker2.velocity = velocity2;
            collisions.add(collisionId);
            // Hack to prevent adhesion
            const centerVec = checker2.position.sub(checker1.position);
            const distance = centerVec.magnitude();
            const distanceDiff = checker1.radius + checker2.radius - distance;
            checker1.position = checker1.position.sub(centerVec.mul(distanceDiff).div(distance));
            checker2.position = checker2.position.sub(
              centerVec.mul(distanceDiff).div(distance).mul(-1),
            );
          }
        }
      });
    });
  }

  private moveCheckers = (dt: number) => {
    this._checkers.forEach((checker) => {
      checker.move(dt, GameEngine.BoardFriction);
    });
  }

  public computeStrikeVelocity = (strikeVec: Vector) => {
    const desiredPower = strikeVec.magnitude();
    const effectivePower =
      Math.min(desiredPower, GameEngine.MaxStrikePower) * GameEngine.StrikePowerToVelocityCoeff;
    return strikeVec.direction().mul(effectivePower);
  }

  private handleInteraction = (gameInteraction: GameInteraction) => {
    if (this._userMoveInProgress) {
      return;
    }
    if (gameInteraction.mouseUp && this._selectedChecker) {
      const strikeToCenter = this._selectedChecker.position.sub(gameInteraction.mousePosition);
      this._selectedChecker.velocity = this.computeStrikeVelocity(strikeToCenter);
      this._userMoveInProgress = true;
      this._selectedChecker = null;
    }
    this._checkers.forEach((checker) => {
      if (
        checker.contains(gameInteraction.mousePosition) &&
        gameInteraction.mouseDown &&
        this._gameType.canTouchChecker(checker)
      ) {
        this._selectedChecker = checker;
      }

      checker.selected = checker === this._selectedChecker;
    });
  }
}
