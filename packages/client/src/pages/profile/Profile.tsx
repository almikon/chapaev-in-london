import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { ChangeData } from './components/ChangeData';
import { ChangePassword } from './components/ChangePassword';
import styles from './Profile.module.sass';

export const Profile: FC = observer(({ store }: Record<string, any>) => {
	const userData = store.user;
	const [changeDataOrPassword, setChangeDataOrPassword] = useState('data' as 'data' | 'password');

	const toggleDataOrPassword = () => {
		if (changeDataOrPassword === 'data') {
			setChangeDataOrPassword('password');
		} else {
			setChangeDataOrPassword('data');
		}
	};

	useEffect(() => {
		setChangeDataOrPassword('data');
	}, [userData]);

	return (
		<div className={styles.profile}>
			{userData !== null && changeDataOrPassword === 'data' &&
            <ChangeData
            	userData={userData}
            	handleChangePasswordButtonClick={toggleDataOrPassword}/>
			}
			{userData !== null && changeDataOrPassword === 'password' &&
            <ChangePassword
            	handleChangePasswordButtonClick={toggleDataOrPassword}/>
			}
			{!userData && 'Загрузка...'}
		</div>
	);
});
