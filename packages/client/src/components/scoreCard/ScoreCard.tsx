import { FC } from 'react';
import { prepareAvatarLink } from '../../utils/prepareAvatarLink';
import { Avatar } from '../UI-elements/Avatar/Avatar';
import styles from './ScoreCard.module.sass';

export type ScoreCardProps = {
  number: string | number;
  avatar?: string | null;
  name: string;
  score: string | number;
};

export const ScoreCard: FC<ScoreCardProps> = (props) => {
	const { number, name, score } = props;
	const avatarUrl = prepareAvatarLink(props.avatar);
	return (
		<div className={styles.scoreCard}>
			<div className={styles.number}>{number}</div>
			<div className={styles.user}>
				<Avatar src={avatarUrl} size={'small'} />
				<div className={styles.user__name}>{name}</div>
			</div>
			<div className={styles.score}>{score}</div>
		</div>
	);
};
