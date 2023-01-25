import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { OldPasswordConfig } from '../../../../assets/inputConfig';
import { Validation } from '../../../../assets/validation';
import styles from '../../../../styles/inputCommon.module.sass';
import { Input } from '../../Input/Input';

type OldPasswordProps = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const OldPasswordInput: FC<OldPasswordProps> = ({ value, onChange }) => {
	const { isRequired, name, maxLength, minLength, placeholder, errorText, label } = OldPasswordConfig;
	const [error, setError] = useState('');

	useEffect(() => {
		if (!value.match(Validation.PASSWORD) && value.length > 0) {
			setError(errorText);

		} else {
			setError('');
		}

	}, [value]);

	return (
		<div className={styles.wrapper}>
			<label className={styles.wrapper__label}>{label}</label>
			<Input
				type={'password'}
				variant={'primary'}
				placeholder={placeholder}
				name={name}
				value={value}
				minLength={minLength}
				maxLength={maxLength}
				required={isRequired}
				onChange={onChange}
				pattern={Validation.PASSWORD}
			/>
			{error
				? <p className={`${styles.wrapper__errorMessage}`}>{error}</p>
				: null}
		</div>
	);
};
