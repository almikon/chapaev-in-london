import React, { ChangeEventHandler } from 'react'
import styles from './Input.module.sass'

interface IInputInterface {
  type: 'text' | 'email' | 'password' | 'phone'
  name: string
  placeholder: string
  label?: string | undefined
  value?: string
  handleChange?: ChangeEventHandler<HTMLInputElement> | undefined
  maxLength?: number | undefined
  minLength?: number | undefined
  required?: boolean | undefined
  ariaLabel?: string | undefined
}

export function Input(props: IInputInterface) {
  return (
    <div className={styles.input__block}>
      <label className={styles.input__label}>{props.label}</label>
      <input
        className={`${styles.input}`}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        minLength={props.minLength}
        value={props.value}
        onChange={props.handleChange}
        required={props.required}
        aria-label={props.ariaLabel}
      />
    </div>
  )
}
