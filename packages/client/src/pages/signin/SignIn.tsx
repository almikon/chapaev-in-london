import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import styles from '../../styles/styles.module.sass'
import { Input } from '../../components/UI-elements/Input/Input'
import { Button } from '../../components/UI-elements/Button/Button'
import { SigninDto } from '../../types/dto/user.dto'
import stores from '../../store'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { RoutePaths } from '../../types/routes'
import { Validation } from '../../assets/validation'
import { Form } from '../../components/UI-elements/Form/Form'
import { LoginUI } from '../../components/UI-elements/LoginUI/LoginUI'
import { PasswordUI } from '../../components/UI-elements/PasswordUI/PasswordUI'

export function SignIn() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const navigate: NavigateFunction = useNavigate()

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
      password,
    }
    console.log(data)
    if (
      !loginError &&
      !passwordError &&
      login.length > 0 &&
      password.length > 0
    ) {
      stores.authorization.signIn(data, navigate)
    }
  }

  return (
    <div className={styles.ui}>
      <Form handleOnSubmit={handleSubmitSignIn}>
        <LoginUI
          handleChangeLogin={handleChangeLogin}
          login={login}
          loginError={loginError}
          setLoginError={setLoginError}></LoginUI>
        <PasswordUI
          handleChangePassword={handleChangePassword}
          password={password}
          passwordError={passwordError}
          setPasswordError={setPasswordError}></PasswordUI>

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
