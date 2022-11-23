import { useEffect, useRef } from 'react'
import { GameTypeAi } from '../../gameEngine/GameType'
import { GameVizualiser } from '../../gameEngine/GameVisualizer'
import { GameEngine } from '../../gameEngine/GameEngine'
import styles from './Game.module.sass'
import commonStyles from '../../styles/styles.module.sass'

export function Game() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }
    const game = new GameEngine()
    const gameViz = new GameVizualiser(game, containerRef.current)
    const gameType = new GameTypeAi(game)
    game.init(gameType)
    gameViz.start()
    return () => {
      gameViz.stop()
    }
  }, [containerRef])

  return (
    <div className={commonStyles.ui}>
      <div ref={containerRef} className={styles.game}></div>{' '}
    </div>
  )
}
