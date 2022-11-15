import { ChangeEvent, useEffect, useState } from 'react'
import { Validation } from '../../../../assets/validation'
import { Input } from '../../Input/Input'

export function SecondNameUI({
  handleChangeSecondName,
  secondName,
  secondNameError,
  setSecondNameError,
}: any) {
  useEffect(() => {
    if (!secondName.match(Validation.NAME) && secondName.length > 0) {
      setSecondNameError(true)
    } else {
      setSecondNameError(false)
    }
  }, [secondName])

  return (
    <Input
      type={'text'}
      variant={'primary'}
      placeholder={'Enter your second name'}
      name={'second_name'}
      label={'second name'}
      value={secondName}
      onChange={handleChangeSecondName}
      showErrorMessage={secondNameError}
      errorMessage={'English and Russian letters.'}
    />
  )
}
