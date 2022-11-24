import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'
import styles from '../../../../styles/inputCommon.module.sass'
import { DisplayNameConfig } from '../../../../assets/inputConfig'

type DisplayNameProps = {
  value:string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const DisplayNameInput: FC<DisplayNameProps> = ({value, onChange}) => {
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = DisplayNameConfig
  const [error, setError] = useState('')

  useEffect(() => {
    !value.match(Validation.DISPLAY_NAME) && value.length > 0
        ? setError(errorText)
        : setError('')
  }, [value])

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