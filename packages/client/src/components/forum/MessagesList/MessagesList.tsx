import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';

import { apiService } from '../../../api/ApiService';
import { limitShowChatMessage } from '../../../assets/config';
import { UsePagination } from '../../../hooks/usePagination';
import { stores } from '../../../store';
import { Message, User } from '../../../types/forumType';
import { Avatar } from '../../UI-elements/Avatar/Avatar';
import { ButtonSend } from '../../UI-elements/ButtonSend/ButtonSend';
import stylesInput from '../../UI-elements/Input/Input.module.sass';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import styles from './MessagesList.module.sass';

type MessagesListProps = {
  messages: Message[];
  handleForm: (message:string) => void;
};

export const MessagesList: FC<MessagesListProps> = observer(({ messages, handleForm }) => {
	const [activeMessages, setCurrentMessages] = useState(messages);
	const [message, setMessage] = useState('');

	const { user } = stores.authorizationStore;

	const handleSubmit = (e: SyntheticEvent) => {
		const comTime = new Date().toLocaleString();
		e.preventDefault();
		if (message && user) {
			handleForm(message);
			const mes: Message = {
				id: Math.random(),
				chat_id: stores.forumStore.activeChat as number,
				time: comTime,
				type: 'test',
				content: message,
				user: stores.authorizationStore.user as User,
			};
			//setCurrentMessages([...activeMessages, mes]);
			apiService.getCommentsApi().createComment(mes);
			setMessage('');
		}
	};

	const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};
	return (
		<div className={styles.messagesList}>
			<ul>
				{
					activeMessages.map(message => (
						<ChatMessage
							key={message.id + Date.now()}
							message={message}
						/>
					))
				}
			</ul>

			<UsePagination<Message>
				limit={limitShowChatMessage}
				list={messages}
				paginateList={setCurrentMessages}
			/>

			<div className={styles.messagesList__sendMessage}>
				<Avatar src={user?.avatar ?? ''} />
				<form
					className={styles.messagesList__form}
					onSubmit={handleSubmit}>
					<textarea
						className={stylesInput.input + ' ' + stylesInput.input_primary + ' ' + styles.messagesList__textArea}
						onChange={handleChangeMessage}
						value={message}
						placeholder={'Введите сообщение...'}
					/>
					<ButtonSend type={'submit'} />
				</form>
			</div>
		</div>
	);
});
