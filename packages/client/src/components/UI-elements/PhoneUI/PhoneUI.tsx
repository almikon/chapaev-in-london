import { ChangeEvent, useEffect, useState } from 'react'
import { Validation } from '../../../assets/validation'
import { Input } from '../Input/Input'

export function PhoneUI({
  handleChangePhone,
  phone,
  phoneError,
  setPhoneError,
}: any) {
  useEffect(() => {
    if (!phone.match(Validation.PHONE) && phone.length > 0) {
      setPhoneError(true)
    } else {
      setPhoneError(false)
    }
  }, [phone])

  return (
    <Input
      type={'tel'}
      variant={'primary'}
      placeholder={'Enter your phone'}
      name={'phone'}
      label={'Phone'}
      value={phone}
      onChange={handleChangePhone}
      showErrorMessage={phoneError}
      errorMessage={'Please provide a valid phone number'}
    />
  )
}
