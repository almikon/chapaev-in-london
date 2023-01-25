import { useEffect, useRef, useState } from 'react';
import { apiService  } from '../../api/ApiService';
import { Button } from '../../components/UI-elements/Button/Button';
import { GameEngine } from '../../gameEngine/GameEngine';
import { GameStats } from '../../gameEngine/GameStats';
import { GameTypeAi } from '../../gameEngine/GameType';
import { GameVizualiser } from '../../gameEngine/GameVisualizer';
import commonStyles from '../../styles/styles.module.sass';
import styles from './Game.module.sass';

type GameState = 'INIT' | 'STARTED' | 'OVER';

const GameStatsPanelToGameWidth = 0.3;

export const Game = () => {
	const [gameState, setGameState] = useState<GameState>('INIT');
	const [winnerId, setWinnerId] = useState(0);
	const [gameStats, setGameStats] = useState<GameStats | null>(null);

	const containerRef = useRef<HTMLDivElement>(null);
	const uiRef = useRef<HTMLDivElement>(null);
	const gameUiContainerRef = useRef<HTMLDivElement>(null);
	const statsContainerRef = useRef<HTMLDivElement>(null);

	const [isFullscreen, setIsFullscreen] = useState(false);

	const onWindowResize = useRef(() => {
		const ui = uiRef.current;
		const game = gameUiContainerRef.current;
		if (!ui || !game) {
			return;
		}
		const uiWidth = ui.clientWidth;
		const clientRect = ui.getBoundingClientRect();
		const uiHeight = window.innerHeight - clientRect.top - 5;
		let gameUiWidth = 0;
		let gameUiHeight = 0;
		if (uiWidth > uiHeight * (1 + GameStatsPanelToGameWidth)) {
			gameUiWidth = uiHeight * (1 + GameStatsPanelToGameWidth);
			gameUiHeight = uiHeight;
		} else {
			gameUiWidth = uiHeight;
			gameUiHeight = uiHeight / (1 + GameStatsPanelToGameWidth);
		}
		game.style.left = `${(uiWidth - gameUiWidth) / 2}px`;
		game.style.width = `${gameUiWidth}px`;
		game.style.height = `${gameUiHeight}px`;
    statsContainerRef.current!.style.fontSize = `${gameUiHeight/50}px`;
	});

	const onFullscreenChange = useRef(() => {
		setIsFullscreen(Boolean(document.fullscreenElement));
	});

	const toggleFullscreen = () => {
		if (isFullscreen) {
			document.exitFullscreen();
		} else {
			uiRef.current?.requestFullscreen();
		}
	};

	const onAfterRound = (stats: GameStats) => {
		setGameStats(stats);
	};

	useEffect(() => {
		if (!containerRef.current) {
			return;
		}
		if (gameState !== 'STARTED') {
			return;
		}

		window.addEventListener('resize', onWindowResize.current);
		onWindowResize.current();
		document.addEventListener('fullscreenchange', onFullscreenChange.current);

		const game = new GameEngine();
		const gameViz = new GameVizualiser(game, containerRef.current);
		gameViz.onGameEnd = playerId => {
			setWinnerId(playerId);
			if (playerId === 1 && gameStats?.player1Score) {
				apiService.getLeaderboardApi().setCurrentUserScore(gameStats?.player1Score);
			}
			setGameState('OVER');
		};
		const gameType = new GameTypeAi(game);
		game.onAfterRound = onAfterRound;
		game.init(gameType);
		gameViz.start();
		return () => {
			gameViz.stop();
			window.removeEventListener('resize', onWindowResize.current);
			window.removeEventListener('fullscreenchange', onFullscreenChange.current);
		};
	}, [containerRef, gameState]);

	if (gameState === 'INIT') {
		return (
			<section className={styles.start}>
				<div className={styles.about} id={'about'}>
					<div className={styles.about__game}>
						<h2 className={styles.about__title}>How to play</h2>

						<p className={styles.about__description}>
              Your goal is to eliminate all the opponent's checkers. Try to wipe
              out the AI as fast as you can, but beware, it's mighty beyond any
              reasonable limits. <br />
              Click the checker, hold the left mouse button, and release it when
              ready. The thin red line shows the direction and power of the
              strike. Good luck!
						</p>

						<h2 className={styles.about__title}>Not scared?</h2>
						<Button
							type={'button'}
							variant={'secondary'}
							size={'large'}
							value={'Let the battle BEGIN!'}
							onClick={() => setGameState('STARTED')}
						/>
					</div>
				</div>
			</section>
		);
	}

	if (gameState === 'OVER') {
		return (
			<section className={styles.start}>
				<div className={styles.about} id={'about'}>
					<div className={styles.about__game}>
						<h2 className={styles.about__title}>Game over!</h2>
						<h2 className={styles.about__score}>Your score: {gameStats?.player1Score}</h2>
						<p className={styles.about__result}>
							{winnerId === 1
								? 'You won?!?! It must be a mistake. I shall fine-tune the AI next time.'
								: 'AHAHAH everything went as planned! You\'ve lost, my friend. Try harder next time.'}
						</p>
						<Button
							type={'button'}
							variant={'secondary'}
							size={'large'}
							value={'I want more!'}
							onClick={() => setGameState('STARTED')}
						/>
					</div>
				</div>
			</section>
		);
	}

	return (
		<div ref={uiRef} className={commonStyles.ui}>
			<div ref={gameUiContainerRef} className={styles['game-ui-container']}>
				<div
					ref={containerRef}
					className={styles.game}
					style={{
						width: `${100 / (1 + GameStatsPanelToGameWidth)}%`,
						minWidth: `${100 / (1 + GameStatsPanelToGameWidth)}%`,
					}}></div>
				<div ref={statsContainerRef} className={styles.stats}>
					<div className={styles['stats__stat-container']}>
						<div className={styles.stats__caption}>Player 1: </div>
						<div className={styles.stats__value}>{gameStats?.player1Score ?? 0}</div>
					</div>
					<div className={styles['stats__stat-container']}>
						<div className={styles.stats__caption}>Player 2: </div>
						<div className={styles.stats__value}>{gameStats?.player2Score ?? 0}</div>
					</div>
					<div className={styles['stats__fullscreen-container']}>
						<Button
							size="small"
							type="button"
							variant="secondary"
							customModifier="button_adaptive"
							value={isFullscreen ? 'Minimize' : 'Go fullscreen'}
							onClick={() => toggleFullscreen()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
