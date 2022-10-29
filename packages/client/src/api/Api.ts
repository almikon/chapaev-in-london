import HTTPTransport from '../services/HTTPTransport'
import { Headers, OptionsWithoutMethod } from '../types/httpTranspport'

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
}

export default Api
