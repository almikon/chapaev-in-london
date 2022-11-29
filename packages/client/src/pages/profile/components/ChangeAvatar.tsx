import React, { SyntheticEvent, useEffect, useState } from "react";
import { Avatar } from "../../../components/UI-elements/Avatar/Avatar";
import styles from "../Profile.module.sass";
import { Button } from "../../../components/UI-elements/Button/Button";
import { apiPath } from "../../../assets/config";
import { apiService } from "../../../api/ApiService";


type ChangeAvatarProps = {
  avatar: string | null,
  login: string
}

export function ChangeAvatar(props: ChangeAvatarProps) {
  const [avatar, setAvatar] = useState('')
  const [isAvatarSaveBtnVisible, setIsAvatarSaveButtonVisible] = useState(false)
  const [avatarFileName, setAvatarFileName] = useState('')
  const avatarUploadInput = document.getElementById('avatarUpload') as HTMLInputElement;

  const prepareAvatarLink = (url: string | null) => {
    return `${apiPath}/resources/${url}`
  }

  useEffect(() => {
    setAvatar(prepareAvatarLink(props.avatar))
  }, [])

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
    <>
      <Avatar type={"upload"} size={"large"} src={avatar} alt={props.login} onClick={handleAvatarClick}></Avatar>
      <label className={styles.profile__avatarFileLabel}>{avatarFileName}</label>
      <input className={styles.profile__avatarInput} id={"avatarUpload"} type={"file"} name={"avatar"}
             accept={"image/*"} onChange={handleChangeInput}></input>
      <Button type={"submit"} variant={"primary"} size={"small"} onClick={handleAvatarUpload}
              value={"Загрузить аватар"}
              customModifier={isAvatarSaveBtnVisible ? 'button_marginDown' : 'button_hidden'}
      />
    </>
  )
}