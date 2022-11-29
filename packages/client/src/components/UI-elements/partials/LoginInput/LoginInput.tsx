import React, { ChangeEventHandler, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styles from './LoginInput.module.sass'
import { Input } from '../../Input/Input';
import { Validation } from '../../../../assets/validation';
import { LoginConfig } from '../../../../assets/inputConfig';

type LoginProps = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  loginError: boolean;
  setLoginError: Dispatch<SetStateAction<boolean>>;
}

export const LoginInput: FC<LoginProps> = ({ value, onChange, loginError, setLoginError }) => {
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = LoginConfig
  const [error, setError] = useState('')

  useEffect(() => {
    if (!value.match(Validation.LOGIN) && value.length > 0) {
      setLoginError(true)
      setError(errorText)
    } else {
      setLoginError(false)
      setError('')
    }
  }, [value,loginError])

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
  )
}
