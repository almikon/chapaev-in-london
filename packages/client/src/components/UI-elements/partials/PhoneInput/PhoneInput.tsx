import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { PhoneConfig } from '../../../../assets/inputConfig';
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'
import styles from '../../../../styles/inputCommon.module.sass'
import stores from '../../../../store';

type PhoneProps = {
  value:string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const PhoneInput: FC<PhoneProps> = ({value, onChange}) => {
  const { isRequired, name, maxLength, minLength, placeholder, errorText,label } = PhoneConfig
  const [error, setError] = useState('')

  useEffect(() => {
    if(!value.match(Validation.PHONE) && value.length > 0){
      setError(errorText)
      stores.validForm.validPhone = false  
    }else{
      setError('')
      stores.validForm.validPhone = true
    }
  }, [value])

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
