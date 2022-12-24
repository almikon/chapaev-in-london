import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { apiService } from '../../../api/ApiService';
import { Button } from '../../../components/UI-elements/Button/Button';
import { Form } from '../../../components/UI-elements/Form/Form';
import { DisplayNameInput } from '../../../components/UI-elements/partials/DisplayNameInput/DisplayNameInput';
import { EmailInput } from '../../../components/UI-elements/partials/EmailInput/EmailInput';
import { FirstNameInput } from '../../../components/UI-elements/partials/FirstNameInput/FirstNameInput';
import { LoginInput } from '../../../components/UI-elements/partials/LoginInput/LoginInput';
import { PhoneInput } from '../../../components/UI-elements/partials/PhoneInput/PhoneInput';
import { SecondNameInput } from '../../../components/UI-elements/partials/SecondNameInput/SecondNameInput';
import { stores } from '../../../store';
import { UpdateUserDto, User } from '../../../types/dto/user.dto';
import styles from '../Profile.module.sass';
import { ChangeAvatar } from './ChangeAvatar';

type ChangeDataProps = {
  userData: any;
  handleChangePasswordButtonClick: () => void;
};

export const ChangeData: FC<ChangeDataProps> = ({ handleChangePasswordButtonClick, userData }) => {
	const navigate: NavigateFunction = useNavigate();
	const errorText = stores.authorizationStore.errorText;

	const [login, setLogin] = useState('');
	const [firstName, setFirstName] = useState('');
	const [secondName, setSecondName] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	// const [phone, setPhone] = useState('');
	const [saveButtonState, setSaveButtonState] = useState(false);
	const [profileChange, setProfileChange] = useState({ isChanged: false, text: '' });

	useEffect(() => {
		if (userData) {
			setEmail(userData.email);
			setLogin(userData.login);
			setFirstName(userData.first_name);
			setSecondName(userData.second_name);
			// setPhone(userData.phone);
		}

		if (userData && userData.display_name) {
			setDisplayName(userData.display_name);
		}
	}, [userData]);

	const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
		setSaveButtonState(e.currentTarget.value !== userData.login);
		setLogin(e.currentTarget.value);
	};

	const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
		setSaveButtonState(e.currentTarget.value !== userData.first_name);
		setFirstName(e.currentTarget.value);
	};

	const handleChangeSecondName = (e: ChangeEvent<HTMLInputElement>) => {
		setSaveButtonState(e.currentTarget.value !== userData.second_name);
		setSecondName(e.currentTarget.value);
	};

	const handleChangeDisplayName = (e: ChangeEvent<HTMLInputElement>) => {
		setSaveButtonState(e.currentTarget.value !== userData.display_name);
		setDisplayName(e.currentTarget.value);
	};

	const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setSaveButtonState(e.currentTarget.value !== userData.email);
		setEmail(e.currentTarget.value);
	};
	//
	// const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setSaveButtonState(e.currentTarget.value !== userData.phone);
	// 	// setPhone(e.currentTarget.value);
	// };

	const handleSubmitProfileData = async (e: SyntheticEvent) => {
		e.preventDefault();
		const data: any = {
			login,
			first_name: firstName,
			display_name: displayName,
			second_name: secondName,
			email,
			// phone,
		};
		await apiService.getUsersApi().changeProfile(data)
			.then((res) => {
				if (res.statusCode === 200) {
					setSaveButtonState(false);
					setProfileChange({ isChanged: true, text: 'Профиль успешно обновлен' });
				} else {
					setSaveButtonState(false);
					setProfileChange({ isChanged: true, text: 'Ошибка при обновлении профиля' });
				}
			})
			.catch(e => {
				throw new Error(e);
			});
	};

	const handleLogout = async (e: SyntheticEvent) => {
		e.preventDefault();
		stores.authorizationStore.logout(navigate);
	};

	return (
		<Form
			onSubmit={handleSubmitProfileData}
			errorText={errorText}>

			<ChangeAvatar avatar={userData.avatar} login={login}/>

			<EmailInput
				onChange={handleChangeEmail}
				value={email}
			/>

			<FirstNameInput
				onChange={handleChangeFirstName}
				value={firstName}
			/>

			<SecondNameInput
				onChange={handleChangeSecondName}
				value={secondName}
			/>

			{/*<PhoneInput*/}
			{/*	onChange={handleChangePhone}*/}
			{/*	value={phone}*/}
			{/*/>*/}

			<LoginInput
				onChange={handleChangeLogin}
				value={login}
			/>

			<DisplayNameInput
				onChange={handleChangeDisplayName}
				value={displayName}
			/>

			{saveButtonState ?
				<Button
					type={'button'}
					variant={'primary'}
					size={'medium'}
					value={'Save'}
					name={'button'}
				/> : profileChange.isChanged ? <p className={styles.profile__updateMessage}>{profileChange.text}</p> : ''}
			<ul className={styles.profile__links}>
				<li className={styles.profile__link} onClick={handleChangePasswordButtonClick}>Изменить пароль</li>
				<li className={`${styles.profile__link} ${styles.profile__link_logout}`}
					onClick={handleLogout}>Выйти
				</li>
			</ul>
		</Form>
	);
};
