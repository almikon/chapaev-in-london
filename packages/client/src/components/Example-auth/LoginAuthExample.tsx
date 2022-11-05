import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import styles from './Auth.module.sass'
import { Input } from '../UI-elements/Input/Input'
import { Button } from '../UI-elements/Button/Button'
import { User } from '../../types/dto/user.dto'
import { apiService } from '../../api/ApiService'

export function LoginAuthExample() {
  const [login, setLogin] = useState('anton71')
  const [password, setPassword] = useState('Aa12345678')
  const [firstName, setFirstName] = useState('Anton')
  const [secondName, setSecondName] = useState('Anton')
  const [email, setEmail] = useState('anton@ya.ru')
  const [phone, setPhone] = useState('+79852322253')
  const [user, setUser] = useState<User>({} as User)

  const authApi = apiService.getAuthApi()

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value)
  }

  const handleChangeSecondName = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondName(e.currentTarget.value)
  }

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.currentTarget.value)
  }

  const handleSubmitSignIn = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const signIn = await authApi.signin({
      login,
      password
    })

    console.log('signIn', signIn)
  }

  const handleChangeGetUser = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const user = await authApi.getUser()
    if (user.data) {
      setUser(user?.data)
    }
  }

  const handleLogOut = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const logout = await authApi.logout()

    console.log('logout', logout)
  }

  const handleSubmitSignUp = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const signUp = await authApi.signup({
      login,
      password,
      first_name: firstName,
      second_name: secondName,
      email,
      phone
    })

    console.log('signUp', signUp?.data?.id)
  }

  return (
    <div className={styles.ui}>
      email - {login}
      password - {password}
      <div className={styles.form__background}>
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
          type={'email'}
          variant={'primary'}
          placeholder={'Enter your email'}
          name={'email'}
          label={'Email'}
          value={email}
          onChange={handleChangeEmail}/>
        <Input
          type={'text'}
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
          placeholder={'Enter password'}
          name={'password'}
          label={'Password'}
          value={password}
          onChange={handleChangePassword}/>
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'SIGN IN'}
          name={'button'}
          onClick={handleSubmitSignIn} />
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'GET USER'}
          name={'button'}
          onClick={handleChangeGetUser} />
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'GET OUT'}
          name={'button'}
          onClick={handleLogOut} />

        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'SIGN UP'}
          name={'button'}
          onClick={handleSubmitSignUp}/>

        <div>{JSON.stringify(user)}</div>
      </div>
    </div>
  )
}