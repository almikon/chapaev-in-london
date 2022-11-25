import { ChangeEventHandler, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { PhoneConfig } from '../../../../assets/inputConfig';
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'
import styles from '../../../../styles/inputCommon.module.sass'

type PhoneProps = {
  value:string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  phoneError: boolean;
  setPhoneError: Dispatch<SetStateAction<boolean>>;
}

export const PhoneInput: FC<PhoneProps> = ({value, onChange, phoneError, setPhoneError}) => {
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = PhoneConfig
  const [error, setError] = useState('')

  useEffect(() => {
    if (!value.match(Validation.PHONE) && value.length > 0) {
      setPhoneError(true)
      setError(errorText)
    } else {
      setPhoneError(false)
      setError('')
    }
  }, [value,phoneError])

  return (
    <div className={styles.wrapper}>
        <label className={styles.wrapper__label}>{label}</label>
        <Input
            type={'tel'}
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
