import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { ChatsList } from '../../components/forum/ChatList/ChatsList';
import { Loader } from '../../components/UI-elements/Loader/Loader';
import { stores } from '../../store';
import stylesUI from '../../styles/styles.module.sass';
import styles from './Forum.module.sass';

export const Forum: FC = observer(() => {
	const { isLoading } = stores.forumStore;

	useEffect(() => {
		stores.forumStore.getChats();
	}, []);

	const className = styles.forum + ' ' + stylesUI.ui;

	return (
		<div className={className}>
			{
				isLoading
					? <Loader />
					: <ChatsList />
			}
		</div>
	);
});
