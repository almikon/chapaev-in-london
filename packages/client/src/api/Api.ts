import HTTPTransport from '../services/HTTPTransport'
import { ApiResponse } from '../types/api'
import { AxiosError, AxiosResponse } from 'axios'
import { OptionsWithoutMethod,Options, Headers } from '../types/httpTransport'

class Api extends HTTPTransport {
  protected readonly url: string

  private headers: Headers = {
    'Content-Type': 'application/json',
  }

  protected options: OptionsWithoutMethod = {
    headers: this.headers,
    withCredentials: true,
  }

  constructor(url: string) {
    super()
    this.url = url
  }

  async requestProcessing<Data>(
    url: string,
    options: Options,
    method: keyof HTTPTransport
  ): Promise<ApiResponse<Data>> {
    const apiResponse: ApiResponse<Data> = {} as ApiResponse<Data>

    try {
      const response: AxiosResponse = await this[method](url, options)

      apiResponse.statusCode = response.status
      apiResponse.data = response.data
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (e.response) {
          apiResponse.statusCode = e.response.status
          apiResponse.message = e.response.data?.reason || e.response.data
        }
      }
    }

    return apiResponse
  }
}

export default Api
