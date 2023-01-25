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
	const [answerToComment, setAnswerToComment] = useState('');
	const [parent_comment_id, setParentCommentId] = useState(0);
	const [activeMessages, setCurrentMessages] = useState([] as Message[]);
	const [parent_user, setParentUser] = useState('');
	const [parent_date, setParentDate] = useState('');
	const [message, setMessage] = useState('');
	const { messages, activeChat } = stores.forumStore;
	const { user } = stores.authorizationStore;

	const getAnswerToComment = (userLogin:string, date:string, parent_comment_id: number) => {
		setAnswerToComment(`В ответ на комментарий ${userLogin} от ${date}`);
		setParentCommentId(parent_comment_id);
		setParentUser(userLogin);
		setParentDate(date);
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (message && user && activeChat) {
			const mes:Message = {
				chat_id: activeChat,
				createdAt: new Date().toLocaleString(),
				message: message,
				user: user as User,
				user_id: user.id,
				parent_user: parent_user,
				parent_date: parent_date,
				parent_comment_id: parent_comment_id
			};
			stores.forumStore.createComment(
				message, user, activeChat, parent_comment_id, parent_user, parent_date);
			setMessage('');
			setCurrentMessages([...activeMessages, mes]);
			setAnswerToComment('');
		}
	};

	const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};
	return (
		<div className={styles.messagesList}>
			<ul>
				{
					activeMessages.sort((a,b)=>a.id!-b.id!).map(activeMessage => (
						activeMessage.chat_id === activeChat && <ChatMessage
							key={activeMessage.user?.display_name + activeMessage.createdAt}
							message={activeMessage}
							answerToComment={getAnswerToComment}
							parent_comment_id={parent_comment_id}
							parent_user={activeMessage.parent_user}
							parent_date={activeMessage.parent_date}
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
				<div className={styles.messagesList__sendMessageContent}>
					{answerToComment}
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
		</div>
	);
});
