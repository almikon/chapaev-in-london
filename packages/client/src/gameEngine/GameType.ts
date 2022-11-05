import { Checker } from './Checker';
import { Game } from './Game';
import { getRandomArbitrary, getRandomIntInclusive } from './utils';
import { Vector } from './Vector';

export abstract class GameType {
  private _game: Game;
  protected _currentPlayerId: number;

  public get game(): Game {
    return this._game;
  }

  constructor(game: Game) {
    this._game = game;
    this._currentPlayerId = Game.Palyer1Id;
  }

  abstract handleRoundEnd(): void;

  abstract canTouchChecker(checker: Checker): boolean;

  protected switchPlayer() {
    this._currentPlayerId =
      this._currentPlayerId === Game.Palyer1Id ? Game.Palyer2Id : Game.Palyer1Id;
  }
}

export class GameTypeHotSeat extends GameType {
  constructor(game: Game) {
    super(game);
    this._currentPlayerId = Game.Palyer1Id;
  }

  public handleRoundEnd() {
    this.switchPlayer();
    this.game.checkers.forEach((checker) => {
      checker.position = new Vector(checker.position.x, Game.Dimension - checker.position.y);
    });
  }

  public canTouchChecker(checker: Checker): boolean {
    return checker.playerId === this._currentPlayerId;
  }
}

export class GameTypeAi extends GameType {
  constructor(game: Game) {
    super(game);
    this._currentPlayerId = Game.Palyer1Id;
  }

  public handleRoundEnd() {
    this.switchPlayer();
    if (this._currentPlayerId === Game.Palyer2Id) {
      const aiCheckers = this.game.checkers.filter(
        (checker) => checker.playerId === Game.Palyer2Id,
      );
      if (aiCheckers.length > 0) {
        const aiChecker = aiCheckers[getRandomIntInclusive(0, aiCheckers.length - 1)];
        let closestPlayerChecker: Checker | null = null;
        this.game.checkers
          .filter((c) => c.playerId === Game.Palyer1Id)
          .forEach((c) => {
            if (
              !closestPlayerChecker ||
              aiChecker.position.distanceTo(c.position) <
                aiChecker.position.distanceTo(closestPlayerChecker.position)
            ) {
              closestPlayerChecker = c;
            }
          });
        const strikeDirection = closestPlayerChecker!.position.sub(aiChecker.position).direction();
        let randomStrike = strikeDirection.mul(
          getRandomArbitrary(Game.MaxStrikePower / 2, Game.MaxStrikePower),
        );
        randomStrike = randomStrike.rotate(getRandomArbitrary(-Math.PI / 30, Math.PI / 30));
        aiChecker.velocity = this.game.computeStrikeVelocity(randomStrike);
        this.game.userMoveInProgress = true;
      }
    }
  }

  public canTouchChecker(checker: Checker): boolean {
    return checker.playerId === Game.Palyer1Id;
  }
}
