import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import styles from './users.module.sass'
import { Input } from '../../UI-elements/Input/Input'
import { Button } from '../../UI-elements/Button/Button'
import { apiService } from '../../../api/ApiService'

export function UsersEl() {
  const [login, setLogin] = useState('anton71')
  const [oldPassword, setOldPassword] = useState('Aa12345678')
  const [newPassword, setNewPassword] = useState('Aa123456789')
  const [userId, setUserId] = useState('60073')
  const [firstName, setFirstName] = useState('Anton')
  const [secondName, setSecondName] = useState('Anton')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('anton@ya.ru')
  const [phone, setPhone] = useState('+79852322253')

  const usersApi = apiService.getUsersApi()

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
  }

  const handleChangePasswordOld = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.currentTarget.value)
  }

  const handleChangePasswordNew = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value)
  }

  const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value)
  }

  const handleChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value)
  }

  const handleChangeSecondName = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondName(e.currentTarget.value)
  }

  const handleChangeDisplayName = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.currentTarget.value)
  }

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.currentTarget.value)
  }

  const handleSubmitChange = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const changeProfile = await usersApi.changeProfile({
      login,
      phone,
      first_name: firstName,
      second_name: secondName,
      email,
      display_name: displayName,
    })

    console.log('changeProfile', changeProfile)
  }

  const handleChangeAvatar = async (e: SyntheticEvent) => {
    e.preventDefault()

    const inputFile = document.getElementById('file') as HTMLInputElement

    if (inputFile && inputFile.files && inputFile.files.length) {
      const file: File | undefined = inputFile.files[0]

      // Просто пример
      const changeAvatar = await usersApi.changeAvatar(file)

      console.log('changeProfile', changeAvatar)
    }
  }

  const handleChangePasswords = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const changePasswords = await usersApi.changePasswords({
      oldPassword,
      newPassword,
    })

    console.log('changePasswords', changePasswords)
  }

  const handleGetUserById = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const getUserById = await usersApi.getUserById(userId)

    console.log('getUserById', getUserById)
  }

  const handleSearchByLogin = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const searchByLogin = await usersApi.search({
      login,
    })

    console.log('searchByLogin', searchByLogin)
  }

  return (
    <div className={styles.ui}>
      email - {login}
      password - {oldPassword}
      <div className={styles.form__background}>
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your first name'}
          name={'userID'}
          label={'User ID'}
          value={userId}
          onChange={handleChangeUserId}/>

        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your first name'}
          name={'first_name'}
          label={'First name'}
          value={firstName}
          onChange={handleChangeFirstName}/>
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your second name'}
          name={'second_name'}
          label={'Second name'}
          value={secondName}
          onChange={handleChangeSecondName}/>
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your second name'}
          name={'second_name'}
          label={'Display name'}
          value={displayName}
          onChange={handleChangeDisplayName}/>
        <Input
          type={'email'}
          variant={'primary'}
          placeholder={'Enter your email'}
          name={'email'}
          label={'Email'}
          value={email}
          onChange={handleChangeEmail}/>
        <Input
          type={'tel'}
          variant={'primary'}
          placeholder={'Enter your phone'}
          name={'phone'}
          label={'Phone'}
          value={phone}
          onChange={handleChangePhone}/>
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter login'}
          name={'login'}
          label={'Login'}
          value={login}
          onChange={handleChangeLogin}/>
        <Input
          type={'password'}
          variant={'primary'}
          placeholder={'Enter oldPassword'}
          name={'password old'}
          label={'Password old'}
          value={oldPassword}
          onChange={handleChangePasswordOld}/>
        <Input
          type={'password'}
          variant={'primary'}
          placeholder={'Enter oldPassword'}
          name={'password new'}
          label={'Password new'}
          value={newPassword}
          onChange={handleChangePasswordNew}/>

        <Input
          type={'file'}
          variant={'primary'}
          placeholder={'Enter oldPassword'}
          name={'file'}
          label={'File'}
          id={'file'}
          onChange={handleChangePasswordOld}/>

        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'CHANGE'}
          name={'button'}
          onClick={handleSubmitChange}/>
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'change avatar'}
          name={'button'}
          onClick={handleChangeAvatar}/>
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'change passwords'}
          name={'button'}
          onClick={handleChangePasswords}/>
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'Get user by id'}
          name={'button'}
          onClick={handleGetUserById}/>
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'Search by login'}
          name={'button'}
          onClick={handleSearchByLogin}/>
      </div>
    </div>
  )
}
