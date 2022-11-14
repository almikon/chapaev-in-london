import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import styles from '../../styles/styles.module.sass'
import { Input } from '../../components/UI-elements/Input/Input'
import { Button } from '../../components/UI-elements/Button/Button'
import { CreateUserDto } from '../../types/dto/user.dto'
import stores from '../../store'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { RoutePaths } from '../../types/routes'
import { Validation } from '../../assets/validation'

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

    if (!firstName.match(Validation.NAME) && firstName.length > 0) {
      setFirstNameError(true)
    } else {
      setFirstNameError(false)
    }

    if (!secondName.match(Validation.NAME) && secondName.length > 0) {
      setSecondNameError(true)
    } else {
      setSecondNameError(false)
    }

    if (!email.match(Validation.EMAIL) && email.length > 0) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }

    if (!phone.match(Validation.PHONE) && phone.length > 0) {
      setPhoneError(true)
    } else {
      setPhoneError(false)
    }

    if ((checkPassword !== password) && checkPassword.length > 0) {
      setCheckPasswordError(true)
    } else {
      setCheckPasswordError(false)
    }
  }, [login, password, email, firstName, secondName, phone, checkPassword])

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
    if (!loginError && !passwordError && !firstNameError && !secondNameError && !emailError && !phoneError && !checkPasswordError) {
      stores.authorization.signUp(data, navigate)
    }
  }

  return (
    <div className={styles.ui}>
      <div className={styles.form__background}>
        <form onSubmit={handleSubmitSignUp}>
          <Input
            type={'email'}
            variant={'primary'}
            placeholder={'Enter your email'}
            name={'email'}
            label={'Email'}
            value={email}
            onChange={handleChangeEmail}
            showErrorMessage={emailError}
            errorMessage={'Please provide a valid email address'}
          />
          <Input
            type={'text'}
            variant={'primary'}
            placeholder={'Enter your first name'}
            name={'first_name'}
            label={'First name'}
            value={firstName}
            onChange={handleChangeFirstName}
            showErrorMessage={firstNameError}
            errorMessage={'English and Russian letters.'}
          />
          <Input
            type={'text'}
            variant={'primary'}
            placeholder={'Enter your second name'}
            name={'second_name'}
            label={'Second name'}
            value={secondName}
            onChange={handleChangeSecondName}
            showErrorMessage={secondNameError}
            errorMessage={'English and Russian letters.'}
          />

          <Input
            type={'tel'}
            variant={'primary'}
            placeholder={'Enter your phone'}
            name={'phone'}
            label={'Phone'}
            value={phone}
            onChange={handleChangePhone}
            showErrorMessage={phoneError}
            errorMessage={'Please provide a valid phone number'}
          />
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
          <Input
            type={'password'}
            variant={'primary'}
            placeholder={'Enter password again'}
            name={'checkPassword'}
            label={'Password again'}
            value={checkPassword}
            onChange={handleCheckPassword}
            showErrorMessage={checkPasswordError}
            errorMessage={'Passwords must match.'}
          />

          <Button
            type={'button'}
            variant={'primary'}
            size={'medium'}
            value={'SIGN UP'}
            name={'button'}
          />
        </form>

        <p>
          <Link to={RoutePaths.SIGN_IN}>Create an account</Link>
        </p>

      </div>
    </div>
  )
}
