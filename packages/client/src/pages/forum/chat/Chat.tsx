import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { ChatArea } from '../../../components/forum/ChatArea/ChatArea';
import stylesUI from '../../../styles/styles.module.sass';

export const Chat: FC = observer(() => {
	return (
		<div className={stylesUI.ui}>
			<ChatArea />
		</div>
	);
});

