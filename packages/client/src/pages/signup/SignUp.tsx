import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import styles from '../../styles/styles.module.sass'
import { Button } from '../../components/UI-elements/Button/Button'
import { CreateUserDto } from '../../types/dto/user.dto'
import stores from '../../store'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { RoutePaths } from '../../types/routes'
import { LoginInput } from '../../components/UI-elements/partials/LoginInput/LoginInput'
import { PasswordUI } from '../../components/UI-elements/partials/PasswordUI/PasswordUI'
import { SecondNameUI } from '../../components/UI-elements/partials/SecondNameUI/SecondNameUI'
import { FirstNameUI } from '../../components/UI-elements/partials/FirstNameUI/FirstNameUI'
import { EmailUI } from '../../components/UI-elements/partials/EmailUI/EmailUI'
import { PhoneUI } from '../../components/UI-elements/partials/PhoneUI/PhoneUI'
import { CheckPasswordUI } from '../../components/UI-elements/partials/CheckPassword/CheckPassword'
import { Form } from '../../components/UI-elements/Form/Form'

export function SignUp() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [checkPassword, setCheckPassword] = useState('')

  const navigate: NavigateFunction = useNavigate()

  const [loginError, setLoginError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [secondNameError, setSecondNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [checkPasswordError, setCheckPasswordError] = useState(false)

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.currentTarget.value)
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
    if (
      !loginError &&
      !passwordError &&
      !firstNameError &&
      !secondNameError &&
      !emailError &&
      !phoneError &&
      !checkPasswordError
    ) {
      stores.authorization.signUp(data, navigate)
    }
  }

  return (
    <div className={styles.ui}>
      <div className={styles.form__background}>
        <Form handleOnSubmit={handleSubmitSignUp}>
          <EmailUI
            handleChangeEmail={handleChangeEmail}
            email={email}
            emailError={emailError}
            setEmailError={setEmailError}
          />

          <FirstNameUI
            handleChangeFirstName={handleChangeFirstName}
            firstName={firstName}
            firstNameError={firstNameError}
            setFirstNameError={setFirstNameError}
          />
          <SecondNameUI
            handleChangeSecondName={handleChangeSecondName}
            secondName={secondName}
            secondNameError={secondNameError}
            setSecondNameError={setSecondNameError}
          />

          <PhoneUI
            handleChangePhone={handleChangePhone}
            phone={phone}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
          />
          <LoginInput
            handleChangeLogin={handleChangeLogin}
            login={login}
            loginError={loginError}
            setLoginError={setLoginError}
          />
          <PasswordUI
            handleChangePassword={handleChangePassword}
            password={password}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
          />
          <CheckPasswordUI
            handleCheckPassword={handleCheckPassword}
            checkPassword={checkPassword}
            checkPasswordError={checkPasswordError}
            setCheckPasswordError={setCheckPasswordError}
            password={password}
          />

          <Button
            type={'button'}
            variant={'primary'}
            size={'medium'}
            value={'SIGN UP'}
            name={'button'}
          />

          <p>
            <Link to={RoutePaths.SIGN_IN}>Create an account</Link>
          </p>
        </Form>
      </div>
    </div>
  )
}
