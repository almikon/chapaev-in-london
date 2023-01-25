import { FC, ReactNode, SyntheticEvent } from 'react';
import styles from './Form.module.sass';

type FormProps = {
  children: ReactNode;
  onSubmit: (event: SyntheticEvent) => void;
  errorText?: string;
};

export const Form: FC<FormProps> = ({ children, onSubmit, errorText }) => {
	return (
		<form
			className={styles.form__background}
			onSubmit={onSubmit}>
			{children}
			<p className={styles.errorText}>{errorText}</p>
		</form>
	);
};
