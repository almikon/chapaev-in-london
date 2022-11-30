import  { FC } from 'react';
import { ScoreCard, ScoreCardProps } from '../scoreCard/ScoreCard';
import styles from './leaderTable.module.sass';

type LeaderTableProps = {
  cards: Array<ScoreCardProps>;
};

export const LeaderTable: FC<LeaderTableProps> = ({ cards }) => {
	return (
		<div className={styles.background}>
			<div className={styles.title}>Leaderboard</div>
			<div className={styles.card}>
				{cards.length
					? cards.map(card => <ScoreCard {...card} key={card.number}/>)
					: <h3>Здесь пока нет записей!</h3>
				}
			</div>
		</div>
	);
};
