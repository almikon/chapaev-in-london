import { useEffect, useRef, useState } from 'react'
import { GameTypeAi } from '../../gameEngine/GameType'
import { GameVizualiser } from '../../gameEngine/GameVisualizer'
import { GameEngine } from '../../gameEngine/GameEngine'
import styles from './Game.module.sass'
import commonStyles from '../../styles/styles.module.sass'
import { Button } from '../../components/UI-elements/Button/Button'
import { Link } from 'react-router-dom'

type GameState = 'INIT' | 'STARTED' | 'OVER'

export function Game() {
  const [gameState, setGameState] = useState<GameState>('INIT')
  const [winnerId, setWinnerId] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }
    if (gameState !== 'STARTED') {
      return
    }
    const game = new GameEngine()
    const gameViz = new GameVizualiser(game, containerRef.current)
    gameViz.onGameEnd = playerId => {
      setWinnerId(playerId)
      setGameState('OVER')
    }
    const gameType = new GameTypeAi(game)
    game.init(gameType)
    gameViz.start()
    return () => {
      gameViz.stop()
    }
  }, [containerRef, gameState])

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
              onClick={() => setGameState('STARTED')}></Button>
          </div>
        </div>
      </section>
    )
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
              onClick={() => setGameState('STARTED')}></Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className={commonStyles.ui}>
      <div ref={containerRef} className={styles.game}></div>{' '}
    </div>
  )
}
