import explosionSound from '../assets/explosion.mp3';
import { Checker } from './Checker';
import { GameEngine } from './GameEngine';
import { GameInteraction } from './GameInteraction';
import { GameStepResult } from './GameStepResult';
import { Particle } from './Particle';
import { Vector } from './Vector';

const gamePalette = {
	boardMargin: '#D2D4C8',
	boardFieldDark: '#2E3532',
	boardFieldLight: '#E0E2DB',
	checker1: '#0C8346',
	checker2: '#8B2635',
};

export class GameVizualiser {
	private _game: GameEngine;
	private _context!: CanvasRenderingContext2D;
	private _outerContainer: Element;

	public get context(): CanvasRenderingContext2D {
		return this._context;
	}

	public get canvas(): HTMLCanvasElement {
		return this._context.canvas;
	}

	private _boardContext!: CanvasRenderingContext2D;
	public get boardContext(): CanvasRenderingContext2D {
		return this._boardContext;
	}

	public get boardCanvas(): HTMLCanvasElement {
		return this._boardContext.canvas;
	}

	private _container!: HTMLDivElement;

	private _gameInteraction: GameInteraction = new GameInteraction();

	private _mousePosition: Vector = new Vector(0, 0);

	private _particles: Particle[] = [];

	public onGameEnd: ((playerId: number) => void) | null = null;

	constructor(game: GameEngine, container: Element) {
		this._game = game;
		this._outerContainer = container;
	}

	private playSound = async (sound: string) => {
		const audio = new Audio(sound);
		await audio.play();
	};

	public start = () => {
		this.stop();
		this._outerContainer.innerHTML = '';
		this._container = document.createElement('div');
		this._container.style.position = 'relative';
		this._container.style.width = '100%';
		this._container.style.paddingTop = '100%';
		this._outerContainer.appendChild(this._container);

		const boardCanvas = document.createElement('canvas');
		boardCanvas.style.position = 'absolute';
		boardCanvas.style.top = '0';
		this._container.appendChild(boardCanvas);
		this._boardContext = boardCanvas.getContext('2d')!;

		const gameCanvas = document.createElement('canvas');
		gameCanvas.style.position = 'absolute';
		gameCanvas.style.top = '0';
		this._container.appendChild(gameCanvas);
		this._context = gameCanvas.getContext('2d')!;

		window.addEventListener('resize', this.onWindowResize);

		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('mousedown', this.onMouseDown);
		document.addEventListener('mouseup', this.onMouseUp);

		this.onWindowResize();
		this.drawBoard();
		window.requestAnimationFrame(this.animationStep);
	};

	public stop = () => {
		window.removeEventListener('resize', this.onWindowResize);

		document.removeEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('mousedown', this.onMouseDown);
		document.removeEventListener('mouseup', this.onMouseUp);
	};

	private onWindowResize = () => {
		const width = this._outerContainer.clientWidth;
		const clientRect = this._outerContainer.getBoundingClientRect();
		const height = window.innerHeight - clientRect.top;
		const innerDimension = Math.min(width, height) - 10;
		this._container.style.left = `${(this._outerContainer.clientWidth - innerDimension) / 2}px`;
		this._container.style.width = `${innerDimension}px`;
		this._container.style.paddingTop = `${innerDimension}px`
		;[this.boardCanvas, this.canvas].forEach(canvas => {
			canvas.width = innerDimension;
			canvas.height = innerDimension;
			canvas.style.width = `${innerDimension}px`;
			canvas.style.height = `${innerDimension}px`;
		});
		this.drawBoard();
	};

	private onMouseMove = (e: MouseEvent) => {
		const rect = this._container.getBoundingClientRect();
		const x = e.clientX - rect.left; //x position within the element.
		const y = e.clientY - rect.top;
		this._mousePosition = new Vector(x, y);
		this._gameInteraction.mousePosition = this.canvasCoordToVector(
			this._mousePosition
		);
	};

	private onMouseDown = () => {
		this._gameInteraction.mouseDown = true;
	};

	private onMouseUp = () => {
		this._gameInteraction.mouseUp = true;
	};

	private vectorToCanvasCoords = (vector: Vector) =>
		new Vector(
			// Game coordinates are cartesian, whereas canvas has Y axis reversed

			(this.canvas.width * vector.x) / GameEngine.Dimension,
			this.canvas.height -
      (this.canvas.height * vector.y) / GameEngine.Dimension
		);

	private canvasCoordToVector = (vector: Vector) => {
		// Game coordinates are cartesian, whereas canvas has Y axis reversed
		return new Vector(
			(GameEngine.Dimension * vector.x) / this.canvas.width,
			GameEngine.Dimension -
      (GameEngine.Dimension * vector.y) / this.canvas.height
		);
	};

	private _startTimeStamp!: number;
	private _prevTimeStamp!: number;

	drawBoard = () => {
		this.boardContext.fillStyle = gamePalette.boardMargin;
		this.boardContext.fillRect(
			0,
			0,
			this.boardCanvas.width,
			this.boardCanvas.height
		);
		const marginX =
      (GameEngine.Margin / GameEngine.Dimension) * this.boardCanvas.width;
		const marginY =
      (GameEngine.Margin / GameEngine.Dimension) * this.boardCanvas.height;
		const stepX = (this.boardCanvas.width - marginX * 2) / 8;
		const stepY = (this.boardCanvas.height - marginY * 2) / 8;
		let colorSwitch = true;
		for (
			let y = marginY;
			y < this.boardCanvas.height - marginY * 1.5;
			y += stepY
		) {
			colorSwitch = !colorSwitch;
			for (
				let x = marginX;
				x < this.boardCanvas.width - marginX * 1.5;
				x += stepX
			) {
				this.boardContext.fillStyle = colorSwitch
					? gamePalette.boardFieldDark
					: gamePalette.boardFieldLight;
				this.boardContext.fillRect(x, y, stepX, stepY);
				colorSwitch = !colorSwitch;
			}
		}
	};

	animationStep: FrameRequestCallback = async timestamp => {
		if (this._startTimeStamp === undefined) {
			this._startTimeStamp = timestamp;
		}
		const step = timestamp - this._prevTimeStamp;
		const dt = step / 1000;

		if (this._prevTimeStamp !== timestamp) {
			if (step) {
				const tickResult = this._game.tick(dt, this._gameInteraction);
				await this.animateDestroyed(tickResult);
				if (tickResult.winnerId && this.onGameEnd) {
					this.onGameEnd(tickResult.winnerId);
				}
			}
			this.draw();
			this._gameInteraction.reset();
		}

		this._prevTimeStamp = timestamp;
		window.requestAnimationFrame(this.animationStep);
	};

	private animateDestroyed = async (tickResult: GameStepResult) => {
		tickResult.destroyedCheckers.forEach(async (checker) => {
			const canvasPos = this.vectorToCanvasCoords(checker.position);
			await this.playSound(explosionSound);
			for (let i = 0; i <= 80; i++) {
				const dx =
          (Math.random() - 0.5) * ((Math.random() * this.canvas.width) / 50);
				const dy =
          (Math.random() - 0.5) * ((Math.random() * this.canvas.height) / 50);
				const radius = (Math.random() * this.canvas.width) / 300;
				const particle = new Particle(
					this._context,
					new Vector(canvasPos.x, canvasPos.y),
					radius,
					this.getCheckerColor(checker),
					new Vector(dx, dy)
				);
				this._particles.push(particle);
			}
		});
		this._particles.forEach((particle, i) => {
			particle.update();
			if (particle.alpha <= 0) {
				this._particles.splice(i, 1);
			}
		});
	};

	clear = () => {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	draw = () => {
		this.clear();
		this._game.checkers.forEach(checker => {
			this.drawChecker(checker);
		});
		this._particles.forEach(particle => {
			particle.draw();
		});
	};

	private drawChecker = (checker: Checker) => {
		const canvasPos = this.vectorToCanvasCoords(checker.position);
		const canvasRadius =
      (this.canvas.width * GameEngine.CheckerRadius) / GameEngine.Dimension;
		const innerRadius = canvasRadius * 0.01;
		const outerRadius = canvasRadius * 0.4;
		const gradient = this.context.createRadialGradient(
			canvasPos.x - canvasRadius / 4,
			canvasPos.y - canvasRadius / 4,
			innerRadius,
			canvasPos.x - canvasRadius / 4,
			canvasPos.y - canvasRadius / 4,
			outerRadius
		);
		gradient.addColorStop(0, '#FFFFFF');
		gradient.addColorStop(1, this.getCheckerColor(checker));

		this.context.beginPath();
		this.context.arc(canvasPos.x, canvasPos.y, canvasRadius, 0, 2 * Math.PI);
		this.context.closePath();
		this.context.fillStyle = gradient;
		this.context.fill();
		if (checker.selected) {
			this.context.beginPath();
			this.context.arc(
				canvasPos.x,
				canvasPos.y,
				canvasRadius + 2,
				0,
				2 * Math.PI
			);
			this.context.strokeStyle = 'red';
			this.context.stroke();

			this.context.beginPath();
			this.context.moveTo(canvasPos.x, canvasPos.y);
			this.context.lineTo(this._mousePosition.x, this._mousePosition.y);
			this.context.strokeStyle = 'red';
			this.context.stroke();
		}
	};

	private getCheckerColor = (checker: Checker): string => {
		return checker.playerId === GameEngine.Palyer1Id
			? gamePalette.checker1
			: gamePalette.checker2;
	};
}
