import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { stores } from '../../../store';
import { User } from '../../../types/forumType';
import { Avatar } from '../../UI-elements/Avatar/Avatar';
import styles from './ChatPreview.module.sass';

type ForumPreviewProps = {
  title: string;
  user: User;
  countMessages: number;
  chatId: number;
  createAd: string;
};

export const ChatPreview: FC<ForumPreviewProps> = ({ title, user, countMessages, createAd, chatId }) => {
	const navigate = useNavigate();
	const handlerChoiceChat = () => {
		stores.forumStore.changeActiveChat(chatId);

		navigate('/forum/chat');
	};
	return (
		<li
			className={styles.chatPreview}
			onClick={handlerChoiceChat}>
			<div className={styles.chatPreview__description}>
				<p className={styles.chatPreview__title}>{title}</p>
				{countMessages > 0
					? <p className={styles.chatPreview__countMessages}>{countMessages} сообщений</p>
					: <p className={styles.chatPreview__countMessages}>Сообщений нема</p>
				}
			</div>

			<div className={styles.chatPreview__info}>
				<Avatar src={user.avatar} />
				<div className={styles.chatPreview__creatorInfo}>
					<p className={styles.chatPreview__userLogin}>{user.first_name}</p>
					<p className={styles.chatPreview__createdAd}>{createAd}</p>
				</div>
			</div>
		</li>
	);
};
