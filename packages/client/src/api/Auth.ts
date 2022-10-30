import Api from './Api'
import { AuthPaths } from '../types/api-paths'
import { ApiResponse } from '../types/api'
import { Options } from '../types/httpTranspport'
import { Id, SigninDto, CreateUserDto, User } from '../types/dto/user.dto'

class Auth extends Api {
  private readonly authPath: string = AuthPaths.AUTH

  constructor(url: string) {
    super(url)
  }

  public async signin(data: SigninDto): Promise<ApiResponse<string>> {
    const url = this.getPathAuth(AuthPaths.SIGN_IN)

    const options: Options = {
      ...this.options,
      data
    }

    return this.requestProcessing<string>(url, options, 'post')
  }

  public async signup(data: CreateUserDto): Promise<ApiResponse<Id>> {
    const url = this.getPathAuth(AuthPaths.SIGN_UP)

    const options: Options = {
      ...this.options,
      data
    }

    return this.requestProcessing<Id>(url, options, 'post')
  }

  public async logout(): Promise<ApiResponse<string>> {
    const url = this.getPathAuth(AuthPaths.LOGOUT)

    const options: Options = {
      ...this.options
    }

    return this.requestProcessing<string>(url, options, 'post')
  }

  public async getUser(): Promise<ApiResponse<User>> {
    const url = this.getPathAuth(AuthPaths.USER)

    const options: Options = {
      ...this.options
    }

    return this.requestProcessing<User>(url, options, 'get')
  }


  private getPathAuth(endPath: string) {
    return `${this.url}/${this.authPath}/${endPath}`
  }
}

export default Auth
