import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { limitShowChatPreview } from '../../../assets/config';
import { UsePagination } from '../../../hooks/usePagination';
import { stores } from '../../../store';
import { Chat } from '../../../types/forumType';
import { RoutePaths } from '../../../types/routes';
import { ChatPreview } from '../ChatPreview/ChatPreview';
import styles from './ChatsList.module.sass';

export const ChatsList: FC = observer(() => {
	const { chats } = stores.forumStore;
	const [currentChats, setCurrentChats] = useState([] as Chat[]);

	return (
		<div className={styles.chatList}>
			<div className={styles.chatList__title}>
				<h2>Cписок чатов</h2>
				<Link className={styles.nav__el} to={RoutePaths.CREATE_CHAT}>Создать новую тему</Link>
			</div>
			<ul className={styles.chatList__list}>
				{
					currentChats.map(item => (
						<ChatPreview
							createAd={item.create_ad}
							title={item.title}
							user={item.creator}
							chatId={item.id}
							key={item.id + Date.now()}
							countMessages={item.unread_count}
						/>
					))
				}
			</ul>

			<UsePagination<Chat>
				limit={limitShowChatPreview}
				list={chats}
				paginateList={setCurrentChats}
			/>
		</div>
	);
});
