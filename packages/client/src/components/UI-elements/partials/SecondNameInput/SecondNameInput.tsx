import { ChangeEventHandler, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'
import styles from '../../../../styles/inputCommon.module.sass'
import { SecondNameConfig } from '../../../../assets/inputConfig'

type SecondNameProps = {
  value:string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  secondNameError: boolean;
  setSecondNameError: Dispatch<SetStateAction<boolean>>;
}

export const SecondNameInput: FC<SecondNameProps> = ({
  value, onChange, secondNameError, setSecondNameError}) => {
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = SecondNameConfig
  const [error, setError] = useState('')

  useEffect(() => {
    if (!value.match(Validation.NAME) && value.length > 0) {
      setSecondNameError(true)
      setError(errorText)
    } else {
      setSecondNameError(false)
      setError('')
    }
  }, [value,secondNameError])

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