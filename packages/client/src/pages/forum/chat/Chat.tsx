import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { ChatArea } from '../../../components/forum/ChatArea/ChatArea';
import styles from './Chat.module.sass';

export const Chat: FC = observer(() => {

	return (
		<div className={styles.chat}>
			<ChatArea />
		</div>
	);
});

