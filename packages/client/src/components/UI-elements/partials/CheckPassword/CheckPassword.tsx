import { ChangeEvent, useEffect, useState } from 'react'
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'

export function CheckPasswordUI({
  handleCheckPassword,
  checkPassword,
  checkPasswordError,
  setCheckPasswordError,
  password,
}: any) {
  useEffect(() => {
    if (checkPassword !== password && checkPassword.length > 0) {
      setCheckPasswordError(true)
    } else {
      setCheckPasswordError(false)
    }
  }, [checkPassword])

  return (
    <Input
      type={'password'}
      variant={'primary'}
      placeholder={'Enter password again'}
      name={'checkPassword'}
      label={'Password again'}
      value={checkPassword}
      onChange={handleCheckPassword}
      showErrorMessage={checkPasswordError}
      errorMessage={'Passwords must match.'}
    />
  )
}
