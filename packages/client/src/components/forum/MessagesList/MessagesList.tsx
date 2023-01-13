import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { limitShowChatMessage } from '../../../assets/config';
import { UsePagination } from '../../../hooks/usePagination';
import { stores } from '../../../store';
import { Message, User } from '../../../types/forumType';
import { Avatar } from '../../UI-elements/Avatar/Avatar';
import { ButtonSend } from '../../UI-elements/ButtonSend/ButtonSend';
import stylesInput from '../../UI-elements/Input/Input.module.sass';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import styles from './MessagesList.module.sass';

export const MessagesList: FC = observer(() => {
	// const handlerSendMessage = (message: string) => {

	// 	const user = stores.authorizationStore.user;
	// 	if(user){

	// 		stores.forumStore.createComment(message, user, activeChat as number);}
	// };
	const { messages, activeChat } = stores.forumStore;
	const { user } = stores.authorizationStore;
	const [activeMessages, setCurrentMessages] = useState([] as Message[]);
	const [message, setMessage] = useState('');
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (message && user && activeChat) {
			const mes = {
				chat_id: activeChat,
				time: new Date().toLocaleString(),
				content: message,
				user: user as User,
			};
			stores.forumStore.createComment(mes.content, user, mes.chat_id);
			setMessage('');
			setCurrentMessages([...activeMessages, mes]);
		}
	};
	console.log(messages);
	const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};
	return (
		<div className={styles.messagesList}>
			<ul>
				{
					activeMessages.map(activeMessage => (
						<ChatMessage
							key={activeMessage.user?.display_name + activeMessage.time}
							message={activeMessage}
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
