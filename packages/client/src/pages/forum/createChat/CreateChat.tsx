import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CreateChatForm } from '../../../components/forum/createChatForm/CreateChatForm';
import { stores } from '../../../store';
import stylesCommon from '../../../styles/styles.module.sass';
import { RoutePaths } from '../../../types/routes';
import styles from './CreateChat.module.sass';

export const CreateChat: FC = observer(() => {
	const handleForm = (title: string, message: string) => {
		if (!!title && !!message) {
			stores.forumStore.createChat(title, message);
			history.go(-1);
		}
	};

	return (
		<div className={stylesCommon.ui + ' ' + styles.createChat}>
			<h2>Создать новую тему</h2>
			<div className={styles.createChat__linkBack}>
				<Link  to={RoutePaths.FORUM}>&larr; Вернуться</Link>
			</div>

			<CreateChatForm handleForm={handleForm} />
		</div>
	);
});
