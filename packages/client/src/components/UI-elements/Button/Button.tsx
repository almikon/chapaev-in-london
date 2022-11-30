import { FC, SyntheticEvent } from 'react';
import styles from './Button.module.sass';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary' | 'accent' | 'inactive';
  customModifier?: string;
  size: 'small' | 'medium' | 'large';
  value: string | number;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  name?: string;
  disabled?: boolean;
  id?: string;
};

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
	return (
		<button
			onClick={props.onClick}
			id={props.id}
			className={`${styles.button} 
        ${styles[`button_${props.variant}`]}
        ${styles[`button_${props.size}`]}
        ${styles[`${props.customModifier}`]}
      `}
			name={props.name}
			disabled={props.disabled}>
			{props.value}
		</button>
	);
};
