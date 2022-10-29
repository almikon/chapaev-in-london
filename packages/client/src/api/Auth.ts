import Api from './Api'
import { AuthPaths } from '../types/api-paths'
import { AuthResponse } from '../types/api'
import { Options } from '../types/httpTranspport'
import { SigninDto, SignUpDto } from '../types/dto'
import { AxiosError, AxiosResponse } from 'axios'
import HTTPTransport from '../services/HTTPTransport'

class Auth extends Api {
  private readonly authPath: string = AuthPaths.AUTH

  constructor(url: string) {
    super(url)
  }

  public async signin(data: SigninDto): Promise<AuthResponse> {
    const url = this.getPathAuth(AuthPaths.SIGN_IN)

    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestAuth(url, options, 'post')
  }

  public async signup(data: SignUpDto): Promise<AuthResponse> {
    const url = this.getPathAuth(AuthPaths.SIGN_UP)

    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestAuth(url, options, 'post')
  }

  public async logout(): Promise<AuthResponse> {
    const url = this.getPathAuth(AuthPaths.LOGOUT)

    const options: Options = {
      ...this.options,
    }

    return this.requestAuth(url, options, 'post')
  }

  public async getUser(): Promise<AuthResponse> {
    const url = this.getPathAuth(AuthPaths.USER)

    const options: Options = {
      ...this.options,
    }

    return this.requestAuth(url, options, 'get')
  }

  private async requestAuth(
    url: string,
    options: Options,
    method: keyof HTTPTransport
  ): Promise<AuthResponse> {
    const authResponse: AuthResponse = {} as AuthResponse

    try {
      const response: AxiosResponse = await this[method](url, options)

      authResponse.statusCode = response.status
      authResponse.data = response.data
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (e.response) {
          authResponse.statusCode = e.response.status
          authResponse.message = e.response.data?.reason || e.response.data
        }
      }
    }

    return authResponse
  }

  private getPathAuth(endPath: string) {
    return `${this.url}/${this.authPath}/${endPath}`
  }
}

export default Auth
