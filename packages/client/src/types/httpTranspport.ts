export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type Headers = {
  [key: string]: string
}

export type Options = {
  data?: any
  headers: Headers
  withCredentials?: boolean
}

export type RequestOptions = {
  options: Options
  method: Method
}

export type OptionsWithoutMethod = Omit<Options, 'method'>
