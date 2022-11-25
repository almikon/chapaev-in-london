import { ChangeEventHandler, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'
import styles from '../../../../styles/inputCommon.module.sass'
import { FirstNameConfig } from '../../../../assets/inputConfig'

type FirstNameProps = {
  value:string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  firstNameError: boolean;
  setFirstNameError: Dispatch<SetStateAction<boolean>>;
}

export const FirstNameInput: FC<FirstNameProps> = ({
  value, onChange, firstNameError, setFirstNameError}) => {
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = FirstNameConfig
  const [error, setError] = useState('')

  useEffect(() => {
    if (!value.match(Validation.NAME) && value.length > 0) {
      setFirstNameError(true)
      setError(errorText)
    } else {
      setFirstNameError(false)
      setError('')
    }
  }, [value,firstNameError])

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