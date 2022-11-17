import React, { useState } from 'react'
import { LeaderTable } from '../../components/leaderTable/leaderTable'
import styles from './Leaderboard.module.sass'

export const Leaderboard = () => {
  const [cards, setCards] = useState([
    {number: 1, name: 'Duke Nukem', score: 999},
    {number: 2, name: 'John Doe', score: 976},
    {number: 3, name: 'Bruce Wayne', score: 961},
    {number: 4, name: 'Another Gamer', score: 876},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},{number: 4, name: 'Another Gamer', score: 876},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},{number: 4, name: 'Another Gamer', score: 876},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
    {number: 5, name: 'Another Gamer', score: 676},
  ]);
  return (
    <div className={styles.page}>
      <LeaderTable cards={cards}/>
    </div>
  )
}
