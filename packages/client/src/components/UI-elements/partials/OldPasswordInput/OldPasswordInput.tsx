import {  ChangeEventHandler, FC, useEffect, useState } from 'react'
import { OldPasswordConfig } from '../../../../assets/inputConfig';
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'
import styles from '../../../../styles/inputCommon.module.sass'

type OldPasswordProps = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const OldPasswordInput: FC<OldPasswordProps> = ({value,onChange}) =>{
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = OldPasswordConfig
  const [error, setError] = useState('')

  useEffect(() => {
    !value.match(Validation.PASSWORD) && value.length > 0
        ? setError(errorText)
        : setError('')
  }, [value])

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
