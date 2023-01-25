import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { PhoneConfig } from '../../../../assets/inputConfig';
import { Validation } from '../../../../assets/validation';
import styles from '../../../../styles/inputCommon.module.sass';
import { Input } from '../../Input/Input';

type PhoneProps = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const PhoneInput: FC<PhoneProps> = ({ value, onChange }) => {
	const { isRequired, name, maxLength, minLength, placeholder, errorText, label } = PhoneConfig;
	const [error, setError] = useState('');

	useEffect(() => {
		if (!value.match(Validation.PHONE) && value.length > 0) {
			setError(errorText);
		} else {
			setError('');
		}

	}, [value]);

	return (
		<div className={styles.wrapper}>
			<label className={styles.wrapper__label}>{label}</label>
			<Input
				type={'tel'}
				variant={'primary'}
				placeholder={placeholder}
				name={name}
				value={value}
				minLength={minLength}
				maxLength={maxLength}
				required={isRequired}
				onChange={onChange}
				pattern={Validation.PHONE}
			/>
			{error
				? <p className={`${styles.wrapper__errorMessage}`}>{error}</p>
				: null}
		</div>
	);
};
