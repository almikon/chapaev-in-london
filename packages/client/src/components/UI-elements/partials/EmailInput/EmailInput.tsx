import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'
import styles from '../../../../styles/inputCommon.module.sass'
import { EmailConfig } from '../../../../assets/inputConfig'

type EmailProps = {
  value:string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const EmailInput: FC<EmailProps> = ({value, onChange}) => {
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = EmailConfig
  const [error, setError] = useState('')

  useEffect(() => {
    !value.match(Validation.EMAIL) && value.length > 0
        ? setError(errorText)
        : setError('')
  }, [value])

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