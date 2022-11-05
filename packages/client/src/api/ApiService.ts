import Auth from './Auth'
import { apiPath } from '../config'
import Users from './Users'
import Chats from './Chats'
import Leaderboard from './Leaderboard'

class ApiService {
  public getAuthApi() {
    return new Auth(apiPath)
  }

  public getUsersApi() {
    return new Users(apiPath)
  }

  public getChatsApi() {
    return new Chats(apiPath)
  }

  public getLeaderboardApi() {
    return new Leaderboard(apiPath)
  }
}

export const apiService = new ApiService()
