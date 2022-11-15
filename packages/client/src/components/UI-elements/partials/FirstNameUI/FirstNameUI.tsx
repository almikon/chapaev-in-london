import { ChangeEvent, useEffect, useState } from 'react'
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'

export function FirstNameUI({
  handleChangeFirstName,
  firstName,
  firstNameError,
  setFirstNameError,
}: any) {
  useEffect(() => {
    if (!firstName.match(Validation.NAME) && firstName.length > 0) {
      setFirstNameError(true)
    } else {
      setFirstNameError(false)
    }
  }, [firstName])

  return (
    <Input
      type={'text'}
      variant={'primary'}
      placeholder={'Enter your first name'}
      name={'first_name'}
      label={'First name'}
      value={firstName}
      onChange={handleChangeFirstName}
      showErrorMessage={firstNameError}
      errorMessage={'English and Russian letters.'}
    />
  )
}
