import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { OldPasswordInput } from "../../../components/UI-elements/partials/OldPasswordInput/OldPasswordInput";
import { PasswordInput } from "../../../components/UI-elements/partials/PasswordInput/PasswordInput";
import { CheckPasswordInput } from "../../../components/UI-elements/partials/CheckPasswordInput/CheckPasswordInput";
import { Button } from "../../../components/UI-elements/Button/Button";
import styles from "../Profile.module.sass";
import { Form } from "../../../components/UI-elements/Form/Form";
import { ChangePasswordsDto } from "../../../types/dto/user.dto";
import { apiService } from "../../../api/ApiService";
import stores from "../../../store";

type ChangePasswordProps = {
  handleChangePasswordButtonClick: () => void;
}

export function ChangePassword(props: ChangePasswordProps) {
  const errorText = stores.authorization.errorText
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [checkNewPassword, setCheckNewPassword] = useState('')
  const [saveButtonState, setSaveButtonState] = useState(false)
  const [passwordChange, setPasswordChange] = useState({isChanged: false, text: ''})

  const handleChangeOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value !== '' ? setSaveButtonState(true) : setSaveButtonState(false)
    setOldPassword(e.currentTarget.value)
  }

  const handleChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value !== '' ? setSaveButtonState(true) : setSaveButtonState(false)
    setNewPassword(e.currentTarget.value)
  }

  const handleCheckNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value !== '' ? setSaveButtonState(true) : setSaveButtonState(false)
    setCheckNewPassword(e.currentTarget.value)
  }

  const handleSubmitPassword = async (e: SyntheticEvent) => {
    e.preventDefault()
    const data: ChangePasswordsDto = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    }
    await apiService.getUsersApi().changePasswords(data)
      .then((res) => {
        if (res.statusCode === 200) {
          setSaveButtonState(false)
          setPasswordChange({isChanged: true, text: 'Пароль успешно обновлен'})
        }
        else {
          setSaveButtonState(false)
          setPasswordChange({isChanged: true, text: 'Ошибка при обновлении пароля'})
        }
      })
      .catch(e => {
        throw new Error(e)
      })
  }

  return (
    <Form
      onSubmit={handleSubmitPassword}
      errorText={errorText}>

      <OldPasswordInput
        onChange={handleChangeOldPassword}
        value={oldPassword}
      />

      <PasswordInput
        onChange={handleChangeNewPassword}
        value={newPassword}
      />

      <CheckPasswordInput
        onChange={handleCheckNewPassword}
        value={checkNewPassword}
        password={newPassword}
      />

      {saveButtonState && newPassword && newPassword === checkNewPassword ?
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'Save'}
          name={'button'}
        /> : passwordChange.isChanged ?
          <p className={styles.profile__updateMessage}>{passwordChange.text}</p> : ''}

      <ul className={styles.profile__links}>
        <li className={styles.profile__link} onClick={props.handleChangePasswordButtonClick}>Назад</li>
      </ul>
    </Form>
  )
}