import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CreateChatForm } from '../../../components/forum/createChatForm/CreateChatForm';
import { stores } from '../../../store';
import stylesCommon from '../../../styles/styles.module.sass';
import { RoutePaths } from '../../../types/routes';
import { omitProps } from '../../../utils/omitProps';
import styles from './CreateChat.module.sass';

export const CreateChat: FC = observer(() => {
	const handleForm = (title: string) => {
		if (title) {
			const user = stores.authorizationStore.user;

			if (user) {
				const userWithoutId = omitProps(user, ['id']);

				stores.forumStore.createChat(title, userWithoutId);
			}
			history.go(-1);
		}
	};

	return (
		<div className={stylesCommon.ui + ' ' + styles.createChat}>
			<h2>Создать новую тему</h2>
			<div className={styles.createChat__linkBack}>
				<Link to={RoutePaths.FORUM}>&larr; Вернуться</Link>
			</div>

			<CreateChatForm handleForm={handleForm} />
		</div>
	);
});
