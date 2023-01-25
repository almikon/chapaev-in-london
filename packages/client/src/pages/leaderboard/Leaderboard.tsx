import { FC, useEffect, useState } from 'react';
import { apiService } from '../../api/ApiService';
import { LeaderTable } from '../../components/leaderTable/leaderTable';
import { ScoreCardProps } from '../../components/scoreCard/ScoreCard';
import styles from './Leaderboard.module.sass';

export const Leaderboard: FC = () => {

	const [cards, setCards] = useState([] as ScoreCardProps[]);

	useEffect(() => {
		getLeaderboard();
	}, []);

	const getLeaderboard = async () => {
		let cardsCount = 0;
		const userApi = apiService.getUsersApi();
		const leaderboardApi = apiService.getLeaderboardApi();
		const leaderboardResponse = await leaderboardApi.getTeamLeaderboard();
		const leaderboardRows = leaderboardResponse.data;
		const cards: ScoreCardProps[] = [];
		if (!leaderboardRows) {
			return;
		}
		for (const leaderboardRow of leaderboardRows) {
			const leaderRow = leaderboardRow.data;
			const userId = leaderRow.userId;
			const userResponse = await userApi.getUserById(userId);
			const user = userResponse.data;
			if (!user) {
				continue;
			}
			const card: ScoreCardProps = {
				number: ++cardsCount,
				name: user.display_name || user.login,
				avatar: user.avatar,
				score: leaderRow.score
			};
			cards.push(card);
		}
		setCards(cards);
	};

	return (
		<div className={styles.page}>
			<LeaderTable cards={cards} />
		</div>
	);
};
