import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { DisplayNameConfig } from '../../../../assets/inputConfig';
import { Validation } from '../../../../assets/validation';
import styles from '../../../../styles/inputCommon.module.sass';
import { Input } from '../../Input/Input';

type DisplayNameProps = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const DisplayNameInput: FC<DisplayNameProps> = ({ value, onChange }) => {
	const { isRequired, name, maxLength, minLength, placeholder, errorText, label } = DisplayNameConfig;
	const [error, setError] = useState('');

	useEffect(() => {
		if (!value.match(Validation.DISPLAY_NAME) && value.length > 0) {
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
				pattern={Validation.DISPLAY_NAME}
			/>
			{error
				? <p className={`${styles.wrapper__errorMessage}`}>{error}</p>
				: null}
		</div>
	);
};
