import { ChangeEvent, useEffect, useState } from 'react'
import { Validation } from '../../../assets/validation'
import { Input } from '../Input/Input'

export function EmailUI({
  handleChangeEmail,
  email,
  emailError,
  setEmailError,
}: any) {
  useEffect(() => {
    if (!email.match(Validation.EMAIL) && email.length > 0) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }, [email])

  return (
    <Input
      type={'email'}
      variant={'primary'}
      placeholder={'Enter your email'}
      name={'email'}
      label={'Email'}
      value={email}
      onChange={handleChangeEmail}
      showErrorMessage={emailError}
      errorMessage={'Please provide a valid email address'}
    />
  )
}
