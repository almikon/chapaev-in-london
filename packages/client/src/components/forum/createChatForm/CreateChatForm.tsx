import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { apiPathYandex } from '../../../assets/config';
import { stores } from '../../../store';
import { Avatar } from '../../UI-elements/Avatar/Avatar';
import { ButtonSend } from '../../UI-elements/ButtonSend/ButtonSend';
import { Input } from '../../UI-elements/Input/Input';
import styles from './CreateChatForm.module.sass';

type CreateChatFormProps = {
	handleForm: (title: string) => void;
};

export const CreateChatForm: FC<CreateChatFormProps> = ({ handleForm }) => {
	const [title, setTitle] = useState('');

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (title) {
			handleForm(title);
		}
	};

	const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	return (
		<div className={styles.createChatForm}>
			<Avatar src={stores.authorizationStore.user?.avatar
				? `${apiPathYandex}/resources/${stores.authorizationStore.user?.avatar}`
				: ''} />
			<form
				className={styles.createChatForm__form}
				onSubmit={handleSubmit}>
				<div className={styles.createChatForm__wrapperInput}>
					<Input
						type={'text'}
						variant={'primary'}
						placeholder={'Введите название чата'}
						name={'chatTitle'}
						value={title}
						onChange={handleChangeTitle}
					/>
				</div>

				<ButtonSend type={'submit'} />
			</form>
		</div>
	);
};
