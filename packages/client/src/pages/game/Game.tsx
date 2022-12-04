import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/UI-elements/Button/Button';
import { GameEngine } from '../../gameEngine/GameEngine';
import { GameTypeAi } from '../../gameEngine/GameType';
import { GameVizualiser } from '../../gameEngine/GameVisualizer';
import commonStyles from '../../styles/styles.module.sass';
import styles from './Game.module.sass';

type GameState = 'INIT' | 'STARTED' | 'OVER';

const GameStatsPanelToGameWidth = 0.5;

export const Game = () => {
	const [gameState, setGameState] = useState<GameState>('INIT');
	const [winnerId, setWinnerId] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const uiRef = useRef<HTMLDivElement>(null);
	const gameUiContainerRef = useRef<HTMLDivElement>(null);

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
	});

	useEffect(() => {
		window.addEventListener('resize', onWindowResize.current);
		onWindowResize.current();
		if (!containerRef.current) {
			return;
		}
		if (gameState !== 'STARTED') {
			return;
		}

		//uiRef.current?.requestFullscreen()

		const game = new GameEngine();
		const gameViz = new GameVizualiser(game, containerRef.current);
		gameViz.onGameEnd = playerId => {
			setWinnerId(playerId);
			setGameState('OVER');
		};
		const gameType = new GameTypeAi(game);
		game.init(gameType);
		gameViz.start();
		return () => {
			gameViz.stop();
			window.removeEventListener('resize', onWindowResize.current);
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
						<h2 className={styles.about__title}>Game over</h2>
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
					className={styles['game-ui-container__game']}
					style={{
						width: `${100 / (1 + GameStatsPanelToGameWidth)}%`,
					}}></div>
				<div className={styles['game-ui-container__stats']}></div>
			</div>
		</div>
	);
};
