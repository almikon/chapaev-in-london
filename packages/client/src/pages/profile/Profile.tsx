import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { NavigateFunction, useNavigate } from "react-router-dom";
import styles from './Profile.module.sass'
import { observer } from "mobx-react-lite";
import { Form } from "../../components/UI-elements/Form/Form";
import { EmailInput } from "../../components/UI-elements/partials/EmailInput/EmailInput";
import { FirstNameInput } from "../../components/UI-elements/partials/FirstNameInput/FirstNameInput";
import { SecondNameInput } from "../../components/UI-elements/partials/SecondNameInput/SecondNameInput";
import { PhoneInput } from "../../components/UI-elements/partials/PhoneInput/PhoneInput";
import { LoginInput } from "../../components/UI-elements/partials/LoginInput/LoginInput";
import { DisplayNameInput } from "../../components/UI-elements/partials/DisplayNameInput/DisplayNameInput";
import { PasswordInput } from "../../components/UI-elements/partials/PasswordInput/PasswordInput";
import { CheckPasswordInput } from "../../components/UI-elements/partials/CheckPasswordInput/CheckPasswordInput";
import { OldPasswordInput } from "../../components/UI-elements/partials/OldPasswordInput/OldPasswordInput";
import { Button } from "../../components/UI-elements/Button/Button";
import { Avatar } from "../../components/UI-elements/Avatar/Avatar";
import stores from '../../store'
import { apiService } from "../../api/ApiService";
import { apiPath } from "../../assets/config";
import { ChangePasswordsDto, UpdateUserDto } from "../../types/dto/user.dto";


export const Profile = observer(({store}: Record<string, any>) => {
  const navigate: NavigateFunction = useNavigate()
  const userData = store.user

  const [login, setLogin] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [checkNewPassword, setCheckNewPassword] = useState('')
  const [changeDataOrPassword, setChangeDataOrPassword] = useState('data')
  const [saveButtonState, setSaveButtonState] = useState(false)
  const [profileChange, setProfileChange] = useState({isChanged: false, text: ''})
  const [passwordChange, setPasswordChange] = useState({isChanged: false, text: ''})
  const [avatar, setAvatar] = useState('')
  const [isAvatarSaveBtnVisible, setIsAvatarSaveButtonVisible] = useState(false)
  const [avatarFileName, setAvatarFileName] = useState('')
  const errorText = stores.authorization.errorText

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

  useEffect(() => {
    userData && setEmail(userData.email)
    userData && setLogin(userData.login)
    userData && setFirstName(userData.first_name)
    userData && setSecondName(userData.second_name)
    userData && setPhone(userData.phone)
    userData && userData.display_name && setDisplayName(userData.display_name)
    userData && userData.avatar && setAvatar(prepareAvatarLink(userData.avatar))
    setChangeDataOrPassword('data')
  }, [userData])


  const prepareAvatarLink = (url: string | null) => {
    return `${apiPath}/resources/${url}`
  }

  const handleChangePasswordButtonClick = () => {
    setProfileChange({isChanged: false, text: ''})
    setPasswordChange({isChanged: false, text: ''})
    changeDataOrPassword === 'data' ? setChangeDataOrPassword('password') : setChangeDataOrPassword('data')
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

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault()
    stores.authorization.logout(navigate)
  }

  const avatarUploadInput = document.getElementById('avatarUpload') as HTMLInputElement;

  const handleChangeInput = () => {
    if (avatarUploadInput.files) {
      setAvatarFileName(avatarUploadInput.files[0].name)
      setIsAvatarSaveButtonVisible(true)
    }
  }

  const handleAvatarClick = (e: SyntheticEvent) => {
    e.preventDefault()


    avatarUploadInput && avatarUploadInput.click()
  }

  const handleAvatarUpload = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (avatarUploadInput.files) {
      const avatar: File = avatarUploadInput.files[0]
      await apiService.getUsersApi().changeAvatar(avatar)
        .then(res => {
          res.data && setAvatar(prepareAvatarLink(res.data.avatar))
          setIsAvatarSaveButtonVisible(false)
          setAvatarFileName('')
        })
        .catch(e => {
          throw new Error(e)
        })
    }
  }


  return (
    <div className={styles.profile}>

      {userData !== null && changeDataOrPassword === 'data' &&
          <Form
              onSubmit={handleSubmitProfileData}
              errorText={errorText}>

              <Avatar type={"upload"} size={"large"} src={avatar} alt={login} onClick={handleAvatarClick}></Avatar>

              <label className={styles.profile__avatarFileLabel}>{avatarFileName}</label>
              <input className={styles.profile__avatarInput} id={"avatarUpload"} type={"file"} name={"avatar"}
                     accept={"image/*"} onChange={handleChangeInput}></input>

              <Button type={"submit"} variant={"primary"} size={"small"} onClick={handleAvatarUpload}
                      value={"Загрузить аватар"}
                      customModifier={isAvatarSaveBtnVisible ? 'button_marginDown' : 'button_hidden'}></Button>

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
                  <li className={styles.profile__link} onClick={handleChangePasswordButtonClick}>Изменить пароль</li>
                  <li className={`${styles.profile__link} ${styles.profile__link_logout}`}
                      onClick={handleLogout}>Выйти
                  </li>
              </ul>
          </Form>
      }

      {userData !== null && changeDataOrPassword === 'password' &&
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
                  <li className={styles.profile__link} onClick={handleChangePasswordButtonClick}>Назад</li>
              </ul>
          </Form>
      }

      {!userData && 'Загрузка...'}

    </div>
  )
})