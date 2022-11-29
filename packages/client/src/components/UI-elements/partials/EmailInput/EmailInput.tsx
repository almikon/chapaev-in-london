import { ChangeEventHandler, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'
import styles from '../../../../styles/inputCommon.module.sass'
import { EmailConfig } from '../../../../assets/inputConfig'

type EmailProps = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  emailError: boolean;
  setEmailError: Dispatch<SetStateAction<boolean>>;
}

export const EmailInput: FC<EmailProps> = ({value, onChange, emailError, setEmailError}) => {
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = EmailConfig
  const [error, setError] = useState('')

  useEffect(() => {
    if (!value.match(Validation.EMAIL) && value.length > 0) {
      setEmailError(true)
      setError(errorText)
    } else {
      setEmailError(false)
      setError('')
    }
  }, [value,emailError])


  return (
    <div className={styles.wrapper}>
      <label className={styles.wrapper__label}>{label}</label>
      <Input
        type={'email'}
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