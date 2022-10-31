import Auth from './Auth'
import { apiPath } from '../config'

class ApiService {
  public getAuthApi() {
    return new Auth(apiPath)
  }
}

export const apiService = new ApiService()
