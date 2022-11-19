import { action, makeObservable, observable } from 'mobx'
import { CreateUserDto, SigninDto, User } from '../types/dto/user.dto'
import { apiService } from '../api/ApiService'
import { NavigateFunction } from 'react-router-dom'
import { RoutePaths } from '../types/routes'

class Authorization {
  user: User | null = null
  errorText = ''

  private api = apiService.getAuthApi()

  constructor() {
    makeObservable(
      this,
      {
        user: observable,
        errorText: observable,
        isLogin: action,
        signUp: action,
        signIn: action,
        logout: action,
      },
      { deep: true }
    )
  }

  isLogin(navigate: NavigateFunction) {
    this.errorText = ''

    this.api
      .getUser()
      .then(({ data, message }) => {
        if (data) {
          this.user = data
        }




        message && this.errorResponse(message, navigate)
      })
      .catch((e: Error) => this.errorResponse(e.message, navigate))
  }

  signIn(
    signInDto: SigninDto, navigate: NavigateFunction) {
    this.errorText = ''

    this.api
      .signin(signInDto)
      .then(({ data, message }) => {
        data && navigate(RoutePaths.PROFILE, { replace: true })

        message && this.errorResponse(message, navigate)
      })
      .catch((e: Error) => this.errorResponse(e.message, navigate))
  }

  signUp(signUpDto: CreateUserDto, navigate: NavigateFunction) {
    this.errorText = ''

    this.api
      .signup(signUpDto)
      .then(({ data, message }) => {
        data?.id && navigate(RoutePaths.PROFILE, { replace: true })

        message && this.errorResponse(message, navigate)
      })
      .catch((e: Error) => this.errorResponse(e.message, navigate))
  }

  logout(navigate: NavigateFunction) {
    this.errorText = ''

    this.api.logout().finally(() => this.errorResponse('', navigate))
  }

  private errorResponse(errorText: string, navigate?: NavigateFunction) {
    this.user = null
    this.errorText = errorText

    if (navigate) {
      navigate(RoutePaths.SIGN_IN, { replace: true })
    }
  }
}

export default new Authorization()
