import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
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
	const errorText = stores.authorizationStore.errorText;

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

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

		stores.authorizationStore.signIn(data, navigate);
	};

	const handleYandexOAuth = () => {
		stores.authorizationStore.getOAuthServiceId();
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
				/>
				<PasswordInput
					value={password}
					onChange={handleChangePassword}
				/>

				<Button
					type={'submit'}
					variant={'primary'}
					size={'medium'}
					value={'SIGN IN'}
					name={'button'}
				/>

				<Button
					type={'button'}
					variant={'accent'}
					size={'medium'}
					value={'Login with Yandex'}
					name={'button-oauth'}
					onClick={handleYandexOAuth}
				/>
				<p>
					<Link to={RoutePaths.SIGN_UP}>Create an account</Link>
				</p>
			</Form>
		</div>
	);
};
