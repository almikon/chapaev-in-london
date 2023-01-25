import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { apiService } from '../../../api/ApiService';
import { Avatar } from '../../../components/UI-elements/Avatar/Avatar';
import { Button } from '../../../components/UI-elements/Button/Button';
import { prepareAvatarLink } from '../../../utils/prepareAvatarLink';
import styles from '../Profile.module.sass';

type ChangeAvatarProps = {
	avatar: string | null;
	login: string;
};

export const ChangeAvatar: FC<ChangeAvatarProps> = (props) => {
	const [avatar, setAvatar] = useState('');
	const [isAvatarSaveBtnVisible, setIsAvatarSaveButtonVisible] = useState(false);
	const [avatarFileName, setAvatarFileName] = useState('');
	const avatarUploadInput = document.getElementById('avatarUpload') as HTMLInputElement;

	useEffect(() => {
		setAvatar(prepareAvatarLink(props.avatar));
	}, []);

	const handleChangeInput = () => {
		if (avatarUploadInput) {
			if (avatarUploadInput.files && avatarUploadInput.files[0]) {
				setAvatarFileName(avatarUploadInput.files[0].name);
				setIsAvatarSaveButtonVisible(true);
			}
		}
	};

	const handleAvatarClick = (e: SyntheticEvent) => {
		e.preventDefault();
		if (avatarUploadInput) {
			avatarUploadInput.click();
		}
	};

	const handleAvatarUpload = async (e: SyntheticEvent) => {
		e.preventDefault();

		if (avatarUploadInput.files) {
			const avatar: File | undefined = avatarUploadInput.files[0];
			if (avatar) {
				await apiService.getUsersApi().changeAvatar(avatar)
					.then(res => {
						if (res.data) {
							setAvatar(prepareAvatarLink(res.data.avatar));
						}
						setIsAvatarSaveButtonVisible(false);
						setAvatarFileName('');
					})
					.catch(e => {
						throw new Error(e);
					});
			}

		}
	};

	return (
		<>
			<Avatar type={'upload'} size={'large'} src={avatar} alt={props.login}
				onClick={handleAvatarClick} />
			<label className={styles.profile__avatarFileLabel}>{avatarFileName}</label>
			<input className={styles.profile__avatarInput} id={'avatarUpload'} type={'file'} name={'avatar'}
						 accept={'image/*'} onChange={handleChangeInput} />
			<Button type={'submit'} variant={'primary'} size={'small'} onClick={handleAvatarUpload}
				value={'Загрузить аватар'}
				customModifier={isAvatarSaveBtnVisible ? 'button_marginDown' : 'button_hidden'}
			/>
		</>
	);
};
