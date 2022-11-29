import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { apiService } from '../../../api/ApiService';
import { Button } from '../../../components/UI-elements/Button/Button';
import { Form } from '../../../components/UI-elements/Form/Form';
import { CheckPasswordInput } from '../../../components/UI-elements/partials/CheckPasswordInput/CheckPasswordInput';
import { OldPasswordInput } from '../../../components/UI-elements/partials/OldPasswordInput/OldPasswordInput';
import { PasswordInput } from '../../../components/UI-elements/partials/PasswordInput/PasswordInput';
import { stores } from '../../../store';
import { ChangePasswordsDto } from '../../../types/dto/user.dto';
import styles from '../Profile.module.sass';

type ChangePasswordProps = {
  handleChangePasswordButtonClick: () => void;
};

export const ChangePassword: FC<ChangePasswordProps> = ({ handleChangePasswordButtonClick }) => {
	const errorText = stores.authorizationStore.errorText;
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [checkNewPassword, setCheckNewPassword] = useState('');
	const [saveButtonState, setSaveButtonState] = useState(false);
	const [passwordChange, setPasswordChange] = useState({ isChanged: false, text: '' });

	const handleChangeOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setSaveButtonState(e.currentTarget.value !== '');
		setOldPassword(e.currentTarget.value);
	};

	const handleChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setSaveButtonState(e.currentTarget.value !== '');
		setNewPassword(e.currentTarget.value);
	};

	const handleCheckNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setSaveButtonState(e.currentTarget.value !== '');
		setCheckNewPassword(e.currentTarget.value);
	};

	const handleSubmitPassword = async (e: SyntheticEvent) => {
		e.preventDefault();
		const data: ChangePasswordsDto = {
			oldPassword: oldPassword,
			newPassword: newPassword,
		};
		await apiService.getUsersApi().changePasswords(data)
			.then((res) => {
				if (res.statusCode === 200) {
					setSaveButtonState(false);
					setPasswordChange({ isChanged: true, text: 'Пароль успешно обновлен' });
				} else {
					setSaveButtonState(false);
					setPasswordChange({ isChanged: true, text: 'Ошибка при обновлении пароля' });
				}
			})
			.catch(e => {
				throw new Error(e);
			});
	};

	return (
		<Form
			onSubmit={handleSubmitPassword}
			errorText={errorText}>

			<OldPasswordInput
				onChange={handleChangeOldPassword}
				value={oldPassword}
			/>

			<PasswordInput
				onChange={handleChangeNewPassword}
				value={newPassword}
			/>

			<CheckPasswordInput
				onChange={handleCheckNewPassword}
				value={checkNewPassword}
				password={newPassword}
			/>

			{saveButtonState && newPassword && newPassword === checkNewPassword ?
				<Button
					type={'button'}
					variant={'primary'}
					size={'medium'}
					value={'Save'}
					name={'button'}
				/> : passwordChange.isChanged ?
					<p className={styles.profile__updateMessage}>{passwordChange.text}</p> : ''}

			<ul className={styles.profile__links}>
				<li className={styles.profile__link} onClick={handleChangePasswordButtonClick}>Назад</li>
			</ul>
		</Form>
	);
};
