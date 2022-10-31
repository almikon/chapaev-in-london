import { Method, Options, RequestOptions } from '../types/httpTransport'
import axios, { AxiosResponse } from 'axios'

class HTTPTransport {
  get(url: string, options: Options = {} as Options): Promise<AxiosResponse> {
    return this._request(url, options, Method.GET)
  }

  post(url: string, options: Options = {} as Options): Promise<AxiosResponse> {
    return this._request(url, options, Method.POST)
  }

  patch(url: string, options: Options = {} as Options): Promise<AxiosResponse> {
    return this._request(url, options, Method.PATCH)
  }

  put(url: string, options: Options = {} as Options): Promise<AxiosResponse> {
    return this._request(url, options, Method.PUT)
  }

  delete(
    url: string,
    options: Options = {} as Options
  ): Promise<AxiosResponse> {
    return this._request(url, options, Method.DELETE)
  }

  private _request(
    url: string,
    options: Options = {} as Options,
    method: Method
  ) {
    return this.request(url, {
      options,
      method,
    })
  }

  private request(
    url: string,
    requestOptions: RequestOptions
  ): Promise<AxiosResponse> {
    const { method, options } = requestOptions
    return axios({ url, method, ...options })
  }
}

export default HTTPTransport
