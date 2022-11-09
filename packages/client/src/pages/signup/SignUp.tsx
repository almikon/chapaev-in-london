import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import styles from '../../styles/styles.module.sass'
import { Input } from '../../components/UI-elements/Input/Input'
import { Button } from '../../components/UI-elements/Button/Button'
import { CreateUserDto } from '../../types/dto/user.dto'
import stores from '../../store'
import { NavigateFunction, useNavigate } from 'react-router-dom'

export function SignUp() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const navigate: NavigateFunction = useNavigate()

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

  const handleSubmitSignUp = async (e: SyntheticEvent) => {
    e.preventDefault()

    const data: CreateUserDto = {
      login,
      password,
      first_name: firstName,
      second_name: secondName,
      email,
      phone,
    }
    stores.authorization.signUp(data, navigate)
  }

  return (
    <div className={styles.ui}>
      <p className={styles.title}>
        CHAPAEV<br></br>in London
      </p>
      <div className={styles.form__background}>
        <Input
          type={'email'}
          variant={'primary'}
          placeholder={'Enter your email'}
          name={'email'}
          label={'Email'}
          value={email}
          onChange={handleChangeEmail}
        />
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your first named'}
          name={'first_name'}
          label={'First name'}
          value={firstName}
          onChange={handleChangeFirstName}
        />
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your second name'}
          name={'second_name'}
          label={'Second name'}
          value={secondName}
          onChange={handleChangeSecondName}
        />

        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your phone'}
          name={'phone'}
          label={'Phone'}
          value={phone}
          onChange={handleChangePhone}
        />
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter login'}
          name={'login'}
          label={'Login'}
          value={login}
          onChange={handleChangeLogin}
        />
        <Input
          type={'password'}
          variant={'primary'}
          placeholder={'Enter password'}
          name={'password'}
          label={'Password'}
          value={password}
          onChange={handleChangePassword}
        />

        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'SIGN UP'}
          name={'button'}
          onClick={handleSubmitSignUp}
        />

        <p>
          <a href="/sign-in">I already have an account</a>
        </p>
      </div>
    </div>
  )
}
