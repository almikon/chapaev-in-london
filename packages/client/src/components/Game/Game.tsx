import { useEffect, useRef } from 'react'
import { GameTypeAi } from '../../gameEngine/GameType'
import { GameVizualiser } from '../../gameEngine/GameVisualizer'
import { Game as GameEngine } from '../../gameEngine/Game'
import styles from './Game.module.sass'

export function Game() {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const game = new GameEngine()
    const gameViz = new GameVizualiser(
      game,
      containerRef.current
    )
    const gameType = new GameTypeAi(game)
    game.init(gameType)
    gameViz.start()
    return () => {
      gameViz.stop()
    }
  }, [containerRef])

  return <div ref={containerRef} className={styles.game}></div>
}
