import { FC } from 'react';
import { apiPathYandex } from '../../../assets/config';
import { Message } from '../../../types/forumType';
import { Avatar } from '../../UI-elements/Avatar/Avatar';
import styles from './ChatMessage.module.sass';

type ChatMessageProps = {
	message: Message;
};

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
	return (
		<li className={styles.chatMessage}>
			<Avatar src={message.user?.avatar
				? `${apiPathYandex}/resources/${message.user?.avatar}`
				: ''} />
			<div className={styles.chatMessage__content}>
				<p className={styles.chatMessage__login}>{message.user?.login}</p>
				<p className={styles.chatMessage__text}>{message.content}</p>
				<p>{message.time}</p>
			</div>
		</li>
	);
};
