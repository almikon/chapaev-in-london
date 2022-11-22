import {  ChangeEventHandler, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { PasswordConfig } from '../../../../assets/inputConfig';
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'
import styles from '../../../../styles/inputCommon.module.sass'

type PasswordProps = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  passwordError: boolean;
  setPasswordError: Dispatch<SetStateAction<boolean>>;
}

export const PasswordInput: FC<PasswordProps> = ({value,onChange, passwordError, setPasswordError}) =>{
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = PasswordConfig
  const [error, setError] = useState('')

  useEffect(() => {
    if (!value.match(Validation.PASSWORD) && value.length > 0) {
      setPasswordError(true)
      setError(errorText)
    } else {
      setPasswordError(false)
      setError('')
    }
  }, [value,passwordError])

  return(
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
        />
        {error
            ? <p className={`${styles.wrapper__errorMessage}`}>{error}</p>
            : null}
      </div>
  )
}
