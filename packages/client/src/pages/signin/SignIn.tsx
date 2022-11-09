import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import styles from '../../styles/styles.module.sass'
import { Input } from '../../components/UI-elements/Input/Input'
import { Button } from '../../components/UI-elements/Button/Button'
import { SigninDto } from '../../types/dto/user.dto'
import stores from '../../store'
import { NavigateFunction, useNavigate } from 'react-router-dom'

export function SignIn() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const navigate: NavigateFunction = useNavigate()

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleSubmitSignIn = async (e: SyntheticEvent) => {
    e.preventDefault()

    const data: SigninDto = {
      login,
      password,
    }

    stores.authorization.signIn(data, navigate)
  }

  return (
    <div className={styles.ui}>
      <p className={styles.title}>
        CHAPAEV<br></br>in London
      </p>
      <div className={styles.form__background}>
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
          value={'SIGN IN'}
          name={'button'}
          onClick={handleSubmitSignIn}
        />
        <p>
          <a href="/sign-up">Create an account</a>
        </p>
      </div>
    </div>
  )
}
