import React, { ChangeEventHandler } from 'react'
import styles from './Input.module.sass'

type InputProps = {
  type: 'text' | 'email' | 'password' | 'file' | 'button' | 'checkbox' | 'hidden' | 'image' | 'radio' | 'reset' | 'submit' | 'tel'
  variant: 'primary' | 'secondary' | 'accent' | 'inactive';
  id?: string;
  name: string;
  customModifier?: string;
  placeholder: string;
  label?: string | undefined;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  required?: boolean | undefined;
  ariaLabel?: string | undefined;
  disabled?: boolean;
  showErrorMessage?: boolean;
  errorMessage?: string;
}

export function Input(props: InputProps) {
  return (
    <div className={styles.input__block}>
      <label className={styles.input__label}>{props.label}</label>
      <input
        className={`${styles.input} 
          ${styles[`input_${props.variant}`]}
          ${styles[`${props.customModifier}`]}
        `}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        minLength={props.minLength}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        aria-label={props.ariaLabel}
        disabled={props.disabled}
      />
      {props.showErrorMessage && <p className={`${styles.input__errorMessage}`}>{props.errorMessage}</p>}
    </div>
  )
}
