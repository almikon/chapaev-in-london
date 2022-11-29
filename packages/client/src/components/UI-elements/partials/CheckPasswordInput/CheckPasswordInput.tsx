import {  ChangeEventHandler, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { CheckPasswordConfig } from '../../../../assets/inputConfig';
import { Input } from '../../Input/Input'
import styles from '../../../../styles/inputCommon.module.sass'

type CheckPasswordProps = {
  value: string;
  password: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checkPasswordError: boolean;
  setCheckPasswordError: Dispatch<SetStateAction<boolean>>;
}

export const CheckPasswordInput: FC<CheckPasswordProps> = ({
  value, password, onChange, checkPasswordError, setCheckPasswordError}) =>{
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = CheckPasswordConfig
  const [error, setError] = useState('')

  useEffect(() => {
    if (value !== password && value.length > 0) {
      setCheckPasswordError(true)
      setError(errorText)
    } else {
      setCheckPasswordError(false)
      setError('')
    }
  }, [value, password, checkPasswordError])

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
