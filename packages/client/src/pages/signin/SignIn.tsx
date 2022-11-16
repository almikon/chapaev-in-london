import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'

import styles from '../../styles/styles.module.sass'
import { Button } from '../../components/UI-elements/Button/Button'
import { SigninDto } from '../../types/dto/user.dto'
import stores from '../../store'
import { RoutePaths } from '../../types/routes'
import { Form } from '../../components/UI-elements/Form/Form'
import { LoginInput } from '../../components/UI-elements/partials/LoginInput/LoginInput';
import { PasswordInput } from '../../components/UI-elements/partials/PasswordInput/PasswordInput';

export function SignIn() {
  const navigate: NavigateFunction = useNavigate()
  const errorText  = stores.authorization.errorText
  
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeLogin = async (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleSubmitSignIn = async (e: SyntheticEvent) => {
    e.preventDefault()
    const data: SigninDto = {
      login,
      password
    }

    stores.authorization.signIn(data, navigate)
  }

  return (
      <div className={styles.ui}>
        <Form
            onSubmit={handleSubmitSignIn}
            errorText={errorText}
        >
          <LoginInput
              value={login}
              onChange={handleChangeLogin}
          />
          <PasswordInput
              value={password}
              onChange={handleChangePassword}
          />

          <Button
              type={'button'}
              variant={'primary'}
              size={'medium'}
              value={'SIGN IN'}
              name={'button'}
          />
          <p>
            <Link to={RoutePaths.SIGN_UP}>Create an account</Link>
          </p>
        </Form>
      </div>
  )
}
