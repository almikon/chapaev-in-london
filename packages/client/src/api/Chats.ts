import Api from './Api'
import { ApiResponse } from '../types/api'
import { Options } from '../types/httpTranspport'
import { ChatsPaths } from '../types/api-paths'
import {
  AddDeleteUserChatDto,
  Chat,
  CreateChatDto,
  DeleteChatDto,
  GetChatDto,
  GetChatUsersDto,
  ResponseChatUsers,
  ResponseDeleteChat,
  ResponseTokenChat
} from '../types/dto/chats.dto'

class Chats extends Api {
  private readonly chatsPath: string = ChatsPaths.CHATS

  constructor(url: string) {
    super(url)
  }

  public async createChat(data: CreateChatDto): Promise<ApiResponse<string>> {
    const url = this.getPathAuth('')

    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestProcessing<string>(url, options, 'post')
  }

  public async deleteChat(
    data: DeleteChatDto
  ): Promise<ApiResponse<ResponseDeleteChat>> {
    const url = this.getPathAuth('')
    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestProcessing<ResponseDeleteChat>(url, options, 'delete')
  }

  public async getChat(
    data: Partial<GetChatDto>
  ): Promise<ApiResponse<Chat[]>> {
    const query = this.getQuery<Partial<GetChatDto>>(data)

    const url =
      query.length === 0
        ? this.getPathAuth('')
        : `${this.url}/${this.chatsPath}${query}`

    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestProcessing<Chat[]>(url, options, 'get')
  }

  public async getChatUsers(
    id: number,
    data: Partial<GetChatUsersDto>
  ): Promise<ApiResponse<ResponseChatUsers[]>> {
    const query = this.getQuery<Partial<GetChatUsersDto>>(data)
    let url = this.getPathAuth(`${id}/${ChatsPaths.USERS}`)

    if (query.length !== 0) {
      url += query
    }

    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestProcessing<ResponseChatUsers[]>(url, options, 'get')
  }

  public async getToken(
    chatId: string
  ): Promise<ApiResponse<ResponseTokenChat>> {
    const url = this.getPathAuth(`${ChatsPaths.TOKEN}/${chatId}`)

    const options: Options = {
      ...this.options,
    }

    return this.requestProcessing<ResponseTokenChat>(url, options, 'post')
  }

  public async addUserChat(data: AddDeleteUserChatDto): Promise<ApiResponse<string>> {
    const url = this.getPathAuth(ChatsPaths.USERS)

    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestProcessing<string>(url, options, 'put')
  }

  public async deleteUserChat(data: AddDeleteUserChatDto): Promise<ApiResponse<string>> {
    const url = this.getPathAuth(ChatsPaths.USERS)

    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestProcessing<string>(url, options, 'delete')
  }

  private getPathAuth(endPath: string) {
    return `${this.url}/${this.chatsPath}/${endPath}`
  }

  private getQuery<T>(data: T): string {
    const startSymbolQuery = '?'
    let query = ''

    for (const dataKey in data) {
      if (query.length === 0) {
        query += startSymbolQuery
      }

      if (query[length - 1] !== startSymbolQuery) {
        query += '&'
      }

      const key = dataKey as keyof typeof data
      const value = data[key]

      query += `${dataKey}=${value}`
    }

    return query
  }
}

export default Chats
