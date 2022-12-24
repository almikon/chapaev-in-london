import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { redirectUri } from '../../assets/config';
import { Button } from '../../components/UI-elements/Button/Button';
import { Form } from '../../components/UI-elements/Form/Form';
import { LoginInput } from '../../components/UI-elements/partials/LoginInput/LoginInput';
import { PasswordInput } from '../../components/UI-elements/partials/PasswordInput/PasswordInput';
import { stores } from '../../store';
import styles from '../../styles/styles.module.sass';
import { SigninDto } from '../../types/dto/user.dto';
import { RoutePaths } from '../../types/routes';

export const SignIn: FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const errorText = stores.authorizationStore.errorText;

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const [loginError, setLoginError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const handleChangeLogin = async (e: ChangeEvent<HTMLInputElement>) => {
		setLogin(e.currentTarget.value);
	};

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};

	const handleSubmitSignIn = async (e: SyntheticEvent) => {
		e.preventDefault();

		const data: SigninDto = {
			login,
			password
		};

		if (
			!loginError &&
      !passwordError
		) {
			stores.authorizationStore.signIn(data, navigate);
		}
	};

	const getServiceId = () => {
		return fetch(`https://ya-praktikum.tech/api/v2/oauth/yandex/service-id?redirect_uri=${redirectUri}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(r => (r.json()));
	};

	const handleYandexOAuth = () => {
		console.log(redirectUri);
		getServiceId()
			.then(res => window.location.replace(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.service_id}&redirect_uri=${redirectUri}`));
	};

	const handleLogout = async (e: SyntheticEvent) => {
		e.preventDefault();
		stores.authorizationStore.logout(navigate);
	};

	return (
		<div className={styles.ui}>
			<Form
				onSubmit={handleSubmitSignIn}
				errorText={errorText}
			>
				<LoginInput
					value={login}
					onChange={handleChangeLogin}
					loginError={loginError}
					setLoginError={setLoginError}
				/>
				<PasswordInput
					value={password}
					onChange={handleChangePassword}
					passwordError={passwordError}
					setPasswordError={setPasswordError}
				/>

				<Button
					type={'submit'}
					variant={'primary'}
					size={'medium'}
					value={'SIGN IN'}
					name={'button'}
				/>

				<p
					onClick={handleYandexOAuth}>
          Login with yandex
				</p>

				<p
					onClick={handleLogout}>
          LOG OUT
				</p>

				<p>
					<Link to={RoutePaths.SIGN_UP}>Create an account</Link>
				</p>
			</Form>
		</div>
	);
};
