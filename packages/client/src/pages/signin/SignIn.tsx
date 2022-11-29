import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

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
	const errorText = stores.authorization.errorText;

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
			stores.authorization.signIn(data, navigate);
		}
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
					type={'button'}
					variant={'primary'}
					size={'medium'}
					value={'SIGN IN'}
					name={'button'}
				/>
				<p>
					<Link to={RoutePaths.SIGN_UP}>Create an account</Link>
				</p>
			</Form>
		</div>
	);
};
