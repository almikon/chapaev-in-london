import { Checker } from './Checker';
import { GameEngine } from './GameEngine';
import { getRandomArbitrary, getRandomIntInclusive } from './utils';
import { Vector } from './Vector';

export abstract class GameType {
	private _game: GameEngine;
	protected _currentPlayerId: number;

	public get game(): GameEngine {
		return this._game;
	}

	constructor(game: GameEngine) {
		this._game = game;
		this._currentPlayerId = GameEngine.Palyer1Id;
	}

  abstract handleRoundEnd(): void;

  abstract canTouchChecker(checker: Checker): boolean;

  protected switchPlayer = () => {
  	this._currentPlayerId =
      this._currentPlayerId === GameEngine.Palyer1Id ? GameEngine.Palyer2Id : GameEngine.Palyer1Id;
  };
}

export class GameTypeHotSeat extends GameType {
	constructor(game: GameEngine) {
		super(game);
		this._currentPlayerId = GameEngine.Palyer1Id;
	}

	public handleRoundEnd = () => {
		this.switchPlayer();
		this.game.checkers.forEach((checker) => {
			checker.position = new Vector(checker.position.x, GameEngine.Dimension - checker.position.y);
		});
	};

	public canTouchChecker = (checker: Checker): boolean => {
		return checker.playerId === this._currentPlayerId;
	};
}

export class GameTypeAi extends GameType {
	constructor(game: GameEngine) {
		super(game);
		this._currentPlayerId = GameEngine.Palyer1Id;
	}

	public handleRoundEnd = () => {
		this.switchPlayer();
		if (this._currentPlayerId === GameEngine.Palyer2Id) {
			const aiCheckers = this.game.checkers.filter(
				(checker) => checker.playerId === GameEngine.Palyer2Id,
			);
			if (aiCheckers.length > 0) {
				const aiChecker = aiCheckers[getRandomIntInclusive(0, aiCheckers.length - 1)];
				let closestPlayerChecker: Checker | null = null;
				this.game.checkers
					.filter((c) => c.playerId === GameEngine.Palyer1Id)
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
					getRandomArbitrary(GameEngine.MaxStrikePower / 2, GameEngine.MaxStrikePower),
				);
				randomStrike = randomStrike.rotate(getRandomArbitrary(-Math.PI / 30, Math.PI / 30));
				aiChecker.velocity = this.game.computeStrikeVelocity(randomStrike);
				this.game.userMoveInProgress = true;
			}
		}
	};

	public canTouchChecker = (checker: Checker): boolean => {
		return checker.playerId === GameEngine.Palyer1Id;
	};
}
