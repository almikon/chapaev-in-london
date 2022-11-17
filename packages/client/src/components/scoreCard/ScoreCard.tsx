import React, { FC } from 'react'
import styles from './ScoreCard.module.sass'

export type ScoreCardProps = {
  number: string | number,
  avatar?: string,
  name: string,
  score: string | number,
}

const ScoreCard: FC<ScoreCardProps> = (props) => {
  const { number, name, score } = props;

  return (
    <div className={styles.scoreCard}>
      <div className={styles.number}>{number}</div>
      <div className={styles.user}>
        <div className={styles.user__avatar}></div>
        <div className={styles.user__name}>{name}</div>
      </div>
      <div className={styles.score}>{score}</div>
    </div>
  )
}

export default ScoreCard