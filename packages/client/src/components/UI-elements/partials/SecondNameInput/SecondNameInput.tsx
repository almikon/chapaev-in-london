import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { SecondNameConfig } from '../../../../assets/inputConfig';
import { Validation } from '../../../../assets/validation';
import styles from '../../../../styles/inputCommon.module.sass';
import { Input } from '../../Input/Input';

type SecondNameProps = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const SecondNameInput: FC<SecondNameProps> = ({ value, onChange }) => {
	const {
		isRequired,
		name,
		maxLength,
		minLength,
		placeholder,
		errorText,
		label,
	} = SecondNameConfig;
	const [error, setError] = useState('');

	useEffect(() => {
		if (!value.match(Validation.NAME) && value.length > 0) {
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
			{error ? (
				<p className={`${styles.wrapper__errorMessage}`}>{error}</p>
			) : null}
		</div>
	);
};
