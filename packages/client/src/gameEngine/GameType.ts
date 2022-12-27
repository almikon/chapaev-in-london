import { Checker } from './Checker';
import { GameEngine } from './GameEngine';
import { getRandomArbitrary, getRandomIntInclusive } from './utils';
import { Vector } from './Vector';

export abstract class GameType {
	private _game: GameEngine;
	protected _currentPlayerId: number;

	private _playerScores: Record<number, number> = {};
	public get playerScores(): Record<number, number> {
		return this._playerScores;
	}
	protected _nextCheckerScore = 0;

	protected get currentPlayerId(): number {
		return this._currentPlayerId;
	}

	public get game(): GameEngine {
		return this._game;
	}

	protected constructor(game: GameEngine) {
		this._game = game;
		this._currentPlayerId = GameEngine.Palyer1Id;
		this._nextCheckerScore = GameEngine.FirstCheckerScore;
		this._playerScores[GameEngine.Palyer1Id] = 0;
		this._playerScores[GameEngine.Palyer2Id] = 0;
	}

	// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
	public handleRoundEnd() {
		this._nextCheckerScore = GameEngine.FirstCheckerScore;
	}

	public calculateScore = (destroyedCheckers: Checker[]) => {
		if (!destroyedCheckers || destroyedCheckers.length === 0) {
			return false;
		}
		destroyedCheckers.forEach(c => {
			if (c.playerId !== this._currentPlayerId) {
				this._playerScores[this.currentPlayerId] += this._nextCheckerScore;
				this._nextCheckerScore += GameEngine.SubsequentCheckerScoreBonus;
			}
		});
		return true;
	};

  abstract canTouchChecker(checker: Checker): boolean;

  protected switchPlayer = () => {
  	this._currentPlayerId =
      this._currentPlayerId === GameEngine.Palyer1Id
      	? GameEngine.Palyer2Id
      	: GameEngine.Palyer1Id;
  };
}

export class GameTypeHotSeat extends GameType {
	constructor(game: GameEngine) {
		super(game);
		this._currentPlayerId = GameEngine.Palyer1Id;
	}

	public handleRoundEnd = () => {
		super.handleRoundEnd();
		this.switchPlayer();
		this.game.checkers.forEach(checker => {
			checker.position = new Vector(
				checker.position.x,
				GameEngine.Dimension - checker.position.y
			);
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
		super.handleRoundEnd();
		this.switchPlayer();
		if (this._currentPlayerId === GameEngine.Palyer2Id) {
			const aiCheckers = this.game.checkers.filter(
				checker => checker.playerId === GameEngine.Palyer2Id
			);
			if (aiCheckers.length > 0) {
				const aiChecker =
          aiCheckers[getRandomIntInclusive(0, aiCheckers.length - 1)];
				let closestPlayerChecker: Checker | null = null;
				this.game.checkers
					.filter(c => c.playerId === GameEngine.Palyer1Id)
					.forEach(c => {
						if (
							!closestPlayerChecker ||
              (aiChecker &&
                aiChecker.position.distanceTo(c.position) <
                  aiChecker.position.distanceTo(closestPlayerChecker.position))
						) {
							closestPlayerChecker = c;
						}
					});

				if (aiChecker) {
					const strikeDirection = closestPlayerChecker!.position
						.sub(aiChecker.position)
						.direction();

					let randomStrike = strikeDirection.mul(
						getRandomArbitrary(
							GameEngine.MaxStrikePower / 2,
							GameEngine.MaxStrikePower
						)
					);
					randomStrike = randomStrike.rotate(
						getRandomArbitrary(-Math.PI / 30, Math.PI / 30)
					);
					if (aiChecker) {
						aiChecker.velocity = this.game.computeStrikeVelocity(randomStrike);
					}
					this.game.userMoveInProgress = true;
				}
			}
		}
	};

	public canTouchChecker = (checker: Checker): boolean => {
		return checker.playerId === GameEngine.Palyer1Id;
	};
}
