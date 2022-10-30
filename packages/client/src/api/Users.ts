import Api from './Api'
import { UsersPaths } from '../types/api-paths'
import { User, UpdateUserDto, ChangePasswordsDto, Login } from '../types/dto/user.dto'
import { ApiResponse } from '../types/api'
import { Options } from '../types/httpTranspport'

class Users extends Api {
  private readonly usersPath: string = UsersPaths.USER

  constructor(url: string) {
    super(url)
  }

  public async changeProfile(data: UpdateUserDto): Promise<ApiResponse<User>> {
    const url = this.getPathAuth(UsersPaths.PROFILE)

    const options: Options = {
      ...this.options,
      data
    }

    return this.requestProcessing<User>(url, options, 'put')
  }

  public async changeAvatar(file: File): Promise<ApiResponse<User>> {
    const url = this.getPathAuth(UsersPaths.PROFILE_AVATAR)

    const data = new FormData();
    data.append('avatar', file);

    const options: Options = {
      ...this.options,
      headers: {
       ' Content-Type': 'multipart/form-data'
      },
      data
    }

    return this.requestProcessing<User>(url, options, 'put')
  }

  public async changePasswords(data: ChangePasswordsDto): Promise<ApiResponse<User>> {
    const url = this.getPathAuth(UsersPaths.PASSWORD)

    const options: Options = {
      ...this.options,
      data
    }

    return this.requestProcessing<User>(url, options, 'put')
  }

  public async getUserById(id: string): Promise<ApiResponse<User>> {
    const url = this.getPathAuth(id)

    const options: Options = {
      ...this.options,
    }

    return this.requestProcessing<User>(url, options, 'get')
  }

  public async search(data: Login): Promise<ApiResponse<User[]>> {
    const url = this.getPathAuth(UsersPaths.SEARCH)

    const options: Options = {
      ...this.options,
      data
    }

    return this.requestProcessing<User[]>(url, options, 'post')
  }

  private getPathAuth(endPath: string) {
    return `${this.url}/${this.usersPath}/${endPath}`
  }
}

export default Users
