import Auth from './Auth'
import { apiPath } from '../config'

export class ApiService {
  public getAuthApi() {
    return new Auth(apiPath)
  }
}
