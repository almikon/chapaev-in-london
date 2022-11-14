import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import styles from '../../styles/styles.module.sass'
import { Input } from '../../components/UI-elements/Input/Input'
import { Button } from '../../components/UI-elements/Button/Button'
import { SigninDto } from '../../types/dto/user.dto'
import stores from '../../store'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { RoutePaths } from '../../types/routes'
import { Validation } from '../../assets/validation'

export function SignIn() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (!login.match(Validation.LOGIN) && login.length > 0) {
      setLoginError(true)
    } else {
      setLoginError(false)
    }

    if (!password.match(Validation.PASSWORD) && password.length > 0) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }, [login, password])

  const handleChangeLogin = async (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
    console.log(login)
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
    if (!loginError && !passwordError && login.length > 0 && password.length > 0) {
      stores.authorization.signIn(data, navigate)
    }
  }

  return (
    <div className={styles.ui}>
      <div className={styles.form__background}>
        <form onSubmit={handleSubmitSignIn}>
          <Input
            type={'text'}
            variant={'primary'}
            placeholder={'Enter login'}
            name={'login'}
            label={'Login'}
            value={login}
            onChange={handleChangeLogin}
            showErrorMessage={loginError}
            errorMessage={'Only English letters and digits. 3-20 symbols.'}
          />
          <Input
            type={'password'}
            variant={'primary'}
            placeholder={'Enter password'}
            name={'password'}
            label={'Password'}
            value={password}
            onChange={handleChangePassword}
            showErrorMessage={passwordError}
            errorMessage={'Only English letters, digits, hyphen and underscore. At least 7 symbols.'}
          />
          <Button
            type={'button'}
            variant={'primary'}
            size={'medium'}
            value={'SIGN IN'}
            name={'button'}
          />
        </form>
        <p>
          <Link to={RoutePaths.SIGN_UP}>Create an account</Link>
        </p>
      </div>
    </div>
  )
}
