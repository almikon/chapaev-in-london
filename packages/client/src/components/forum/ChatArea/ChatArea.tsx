import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { stores } from '../../../store';
import stylesCommon from '../../../styles/styles.module.sass';
import { RoutePaths } from '../../../types/routes';
import { MessagesList } from '../MessagesList/MessagesList';
import styles from './ChatArea.module.sass';

export const ChatArea: FC = () => {
	const { activeChat, messages } = stores.forumStore;
	const [title, setTitle] = useState('');

	useEffect(() => {
		const findChat = stores.forumStore.chats.find(item => item.id === activeChat);
		if (findChat) {
			setTitle(findChat.title);
		}
	}, [activeChat]);

	useEffect(() => {
		if (activeChat !== null) {
			stores.forumStore.getMessages(activeChat);
		}
	}, [activeChat]);

	const handlerSendMessage = (message: string) => {
		console.log('message', message);
	};

	return (
		<div>
			<div className={stylesCommon.ui + ' ' + styles.chatArea}>
				<h2>{title}</h2>
				<div className={styles.chatArea__linkBack}>
					<Link to={RoutePaths.FORUM}>&larr; Вернуться</Link></div>
			</div>
			<MessagesList
				messages={messages}
				handleForm={handlerSendMessage}
			/>
		</div>
	);
};
