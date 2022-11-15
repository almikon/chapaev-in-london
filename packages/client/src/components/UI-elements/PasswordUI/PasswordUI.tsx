import { ChangeEvent, useEffect, useState } from 'react'
import { Validation } from '../../../assets/validation'
import { Input } from '../Input/Input'

export function PasswordUI({
  handleChangePassword,
  password,
  passwordError,
  setPasswordError,
}: any) {
  useEffect(() => {
    if (!password.match(Validation.PASSWORD) && password.length > 0) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }, [password])

  return (
    <Input
      type={'password'}
      variant={'primary'}
      placeholder={'Enter password'}
      name={'password'}
      label={'Password'}
      value={password}
      onChange={handleChangePassword}
      showErrorMessage={passwordError}
      errorMessage={
        'Only English letters, digits, hyphen and underscore. At least 7 symbols.'
      }
    />
  )
}
