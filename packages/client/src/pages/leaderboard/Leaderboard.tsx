import { FC } from 'react';
import { LeaderTable } from '../../components/leaderTable/leaderTable';
import styles from './Leaderboard.module.sass';

export const Leaderboard: FC = () => {
	const cards = [
		{ number: 1, name: 'Vasya Pupkin', score: 999 },
		{ number: 2, name: 'John Doe', score: 976 },
		{ number: 3, name: 'Bruce Wayne', score: 961 },
		{ number: 4, name: 'Duke Nukem', score: 876 },
		{ number: 5, name: 'Another Gamer', score: 676 },
		{ number: 6, name: 'Another Gamer', score: 676 },
		{ number: 7, name: 'Another Gamer', score: 676 },
		{ number: 8, name: 'Another Gamer', score: 676 },
		{ number: 9, name: 'Another Gamer', score: 676 },
		{ number: 10, name: 'Another Gamer', score: 676 },
		{ number: 11, name: 'Another Gamer', score: 676 },
		{ number: 12, name: 'Another Gamer', score: 676 },
		{ number: 13, name: 'Another Gamer', score: 676 },
		{ number: 14, name: 'Another Gamer', score: 676 },
		{ number: 15, name: 'Another Gamer', score: 676 },
		{ number: 16, name: 'Another Gamer', score: 676 },
		{ number: 17, name: 'Another Gamer', score: 676 },
		{ number: 18, name: 'Another Gamer', score: 676 },
		{ number: 19, name: 'Another Gamer', score: 676 },
		{ number: 20, name: 'Another Gamer', score: 676 },
		{ number: 21, name: 'Another Gamer', score: 676 },
		{ number: 22, name: 'Another Gamer', score: 676 },
		{ number: 23, name: 'Another Gamer', score: 676 },
		{ number: 24, name: 'Another Gamer', score: 676 },
		{ number: 25, name: 'Another Gamer', score: 676 },
		{ number: 26, name: 'Another Gamer', score: 676 },
		{ number: 27, name: 'Another Gamer', score: 676 },
		{ number: 28, name: 'Another Gamer', score: 676 },
	];
	return (
		<div className={styles.page}>
			<LeaderTable cards={cards}/>
		</div>
	);
};
