import { FC } from 'react';
import { apiPathYandex } from '../../../assets/config';
import { Message } from '../../../types/forumType';
import { Avatar } from '../../UI-elements/Avatar/Avatar';
import { Button } from '../../UI-elements/Button/Button';
import styles from './ChatMessage.module.sass';

type ChatMessageProps = {
	message: Message;
	answerToComment: ((user:string, date:string, parentId:number, parent_user:string, parent_date:string ) => void);
	parentId: number;
	parent_user: string;
	parent_date: string;
};

export const ChatMessage: FC<ChatMessageProps> = (
	{ message, answerToComment, parentId, parent_user, parent_date }) => {
	const date = new Date(message.createdAt).toLocaleString();
	const handleAnswer = () => {
		if(message.user?.login){
			answerToComment(message.user?.login, date, parentId, parent_user, parent_date);}
	};
	console.log();
	return (
		<li className={styles.chatMessage}>
			<Avatar src={message.user?.avatar
				? `${apiPathYandex}/resources/${message.user?.avatar}`
				: ''} />
			<div className={styles.chatMessage__content}>
				{parent_user && <div className={styles.chatMessage__parentComment}>
					<p>В ответ на комментарий {parent_user} от {parent_date}</p>
				</div>}
				<p className={styles.chatMessage__login}>{message.user?.login}</p>
				<p className={styles.chatMessage__text}>{message.message}</p>
				<p>{ date }</p>
				<Button
					type='button'
					variant='primary'
					size='small'
					value='Ответить'
					onClick={handleAnswer}
				/>
			</div>
		</li>

	);
};
