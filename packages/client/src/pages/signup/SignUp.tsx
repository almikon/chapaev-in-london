import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI-elements/Button/Button';
import { Form } from '../../components/UI-elements/Form/Form';
import { CheckPasswordInput } from '../../components/UI-elements/partials/CheckPasswordInput/CheckPasswordInput';
import { EmailInput } from '../../components/UI-elements/partials/EmailInput/EmailInput';
import { FirstNameInput } from '../../components/UI-elements/partials/FirstNameInput/FirstNameInput';
import { LoginInput } from '../../components/UI-elements/partials/LoginInput/LoginInput';
import { PasswordInput } from '../../components/UI-elements/partials/PasswordInput/PasswordInput';
import { PhoneInput } from '../../components/UI-elements/partials/PhoneInput/PhoneInput';
import { SecondNameInput } from '../../components/UI-elements/partials/SecondNameInput/SecondNameInput';
import { stores } from '../../store';
import styles from '../../styles/styles.module.sass';
import { CreateUserDto } from '../../types/dto/user.dto';
import { RoutePaths } from '../../types/routes';

export const SignUp: FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [secondName, setSecondName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [checkPassword, setCheckPassword] = useState('');

	const navigate: NavigateFunction = useNavigate();
	const errorText = stores.authorizationStore.errorText;

	const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
		setLogin(e.currentTarget.value);
	};

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};

	const handleCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setCheckPassword(e.currentTarget.value);
	};

	const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.currentTarget.value);
	};

	const handleChangeSecondName = (e: ChangeEvent<HTMLInputElement>) => {
		setSecondName(e.currentTarget.value);
	};

	const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};

	const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
		setPhone(e.currentTarget.value);
	};

	const handleSubmitSignUp = async (e: SyntheticEvent) => {
		e.preventDefault();

		const data: CreateUserDto = {
			login,
			password,
			first_name: firstName,
			second_name: secondName,
			email,
			phone,
		};

		stores.authorizationStore.signUp(data, navigate);
	};

	return (
		<div className={styles.ui}>
			<div className={styles.form__background}>
				<Form
					onSubmit={handleSubmitSignUp}
					errorText={errorText}>
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

					<PhoneInput
						onChange={handleChangePhone}
						value={phone}
					/>
					<LoginInput
						value={login}
						onChange={handleChangeLogin}
					/>
					<PasswordInput
						value={password}
						onChange={handleChangePassword}
					/>
					<CheckPasswordInput
						onChange={handleCheckPassword}
						value={checkPassword}
						password={password}
					/>

					<Button
						type={'button'}
						variant={'primary'}
						size={'medium'}
						value={'SIGN UP'}
						name={'button'}
					/>

					<p>
						<Link to={RoutePaths.SIGN_IN}>I already have an account</Link>
					</p>
				</Form>
			</div>
		</div>
	);
};
