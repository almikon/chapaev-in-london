import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Form } from "../../../components/UI-elements/Form/Form";
import styles from "../Profile.module.sass";
import { Button } from "../../../components/UI-elements/Button/Button";
import { EmailInput } from "../../../components/UI-elements/partials/EmailInput/EmailInput";
import { FirstNameInput } from "../../../components/UI-elements/partials/FirstNameInput/FirstNameInput";
import { SecondNameInput } from "../../../components/UI-elements/partials/SecondNameInput/SecondNameInput";
import { PhoneInput } from "../../../components/UI-elements/partials/PhoneInput/PhoneInput";
import { LoginInput } from "../../../components/UI-elements/partials/LoginInput/LoginInput";
import { DisplayNameInput } from "../../../components/UI-elements/partials/DisplayNameInput/DisplayNameInput";
import { UpdateUserDto, User } from "../../../types/dto/user.dto";
import { apiService } from "../../../api/ApiService";
import stores from "../../../store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ChangeAvatar } from "./ChangeAvatar";


type ChangeDataProps = {
  userData: User
  handleChangePasswordButtonClick: () => void;
}

export function ChangeData(props: ChangeDataProps) {
  const userData = props.userData
  const navigate: NavigateFunction = useNavigate()
  const errorText = stores.authorization.errorText

  const [login, setLogin] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [saveButtonState, setSaveButtonState] = useState(false)
  const [profileChange, setProfileChange] = useState({isChanged: false, text: ''})

  useEffect(() => {
    userData && setEmail(userData.email)
    userData && setLogin(userData.login)
    userData && setFirstName(userData.first_name)
    userData && setSecondName(userData.second_name)
    userData && setPhone(userData.phone)
    userData && userData.display_name && setDisplayName(userData.display_name)
  }, [userData])

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value !== userData.login ? setSaveButtonState(true) : setSaveButtonState(false)
    setLogin(e.currentTarget.value)
  }

  const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value !== userData.first_name ? setSaveButtonState(true) : setSaveButtonState(false)
    setFirstName(e.currentTarget.value)
  }

  const handleChangeSecondName = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value !== userData.second_name ? setSaveButtonState(true) : setSaveButtonState(false)
    setSecondName(e.currentTarget.value)
  }

  const handleChangeDisplayName = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value !== userData.display_name ? setSaveButtonState(true) : setSaveButtonState(false)
    setDisplayName(e.currentTarget.value)
  }

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value !== userData.email ? setSaveButtonState(true) : setSaveButtonState(false)
    setEmail(e.currentTarget.value)
  }

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value !== userData.phone ? setSaveButtonState(true) : setSaveButtonState(false)
    setPhone(e.currentTarget.value)
  }

  const handleSubmitProfileData = async (e: SyntheticEvent) => {
    e.preventDefault()
    const data: UpdateUserDto = {
      login,
      first_name: firstName,
      display_name: displayName,
      second_name: secondName,
      email,
      phone,
    }
    await apiService.getUsersApi().changeProfile(data)
      .then((res) => {
        if (res.statusCode === 200) {
          setSaveButtonState(false)
          setProfileChange({isChanged: true, text: 'Профиль успешно обновлен'})
        }
        else {
          setSaveButtonState(false)
          setProfileChange({isChanged: true, text: 'Ошибка при обновлении профиля'})
        }
      })
      .catch(e => {
        throw new Error(e)
      })
  }

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault()
    stores.authorization.logout(navigate)
  }


  return (
    <Form
      onSubmit={handleSubmitProfileData}
      errorText={errorText}>

      <ChangeAvatar avatar={userData.avatar} login={login}/>

      <EmailInput
        onChange={handleChangeEmail}
        value={email}
      />

      <FirstNameInput
        onChange={handleChangeFirstName}
        value={firstName}
      />

      <SecondNameInput
        onChange={handleChangeSecondName}
        value={secondName}
      />

      <PhoneInput
        onChange={handleChangePhone}
        value={phone}
      />

      <LoginInput
        onChange={handleChangeLogin}
        value={login}
      />

      <DisplayNameInput
        onChange={handleChangeDisplayName}
        value={displayName}
      />

      {saveButtonState ?
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'Save'}
          name={'button'}
        /> : profileChange.isChanged ? <p className={styles.profile__updateMessage}>{profileChange.text}</p> : ''}
      <ul className={styles.profile__links}>
        <li className={styles.profile__link} onClick={props.handleChangePasswordButtonClick}>Изменить пароль</li>
        <li className={`${styles.profile__link} ${styles.profile__link_logout}`}
            onClick={handleLogout}>Выйти
        </li>
      </ul>
    </Form>
  )
}