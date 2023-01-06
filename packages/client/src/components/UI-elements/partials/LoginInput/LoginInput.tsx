import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { LoginConfig } from '../../../../assets/inputConfig';
import { Validation } from '../../../../assets/validation';
import { Input } from '../../Input/Input';
import styles from './LoginInput.module.sass';

type LoginProps = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
export const LoginInput: FC<LoginProps> = ({ value, onChange }) => {
	const { isRequired, name, maxLength, minLength, placeholder, errorText, label } = LoginConfig;
	const [error, setError] = useState('');

	useEffect(() => {
		if (!value.match(Validation.LOGIN) && value.length > 0) {
			setError(errorText);
		} else {
			setError('');
		}
	}, [value]);

	return (
		<div className={styles.wrapper}>
			<label className={styles.wrapper__label}>{label}</label>
			<Input
				type={'text'}
				variant={'primary'}
				placeholder={placeholder}
				name={name}
				value={value}
				minLength={minLength}
				maxLength={maxLength}
				required={isRequired}
				onChange={onChange}
			/>
			{error
				? <p className={`${styles.wrapper__errorMessage}`}>{error}</p>
				: null}
		</div>
	);
};
