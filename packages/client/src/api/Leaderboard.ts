import Api from './Api'
import { ApiResponse } from '../types/api'
import { Options } from '../types/httpTranspport'
import { LeaderBoardPaths } from '../types/api-paths'
import { AddLeaderboardDto } from '../types/dto/leaderboard.dto'

class Leaderboard extends Api {
  private readonly leaderboardPath: string = LeaderBoardPaths.LEADERBOARD

  constructor(url: string) {
    super(url)
  }

  public async addUser(data: AddLeaderboardDto): Promise<ApiResponse<string>> {
    const url = this.getPathAuth('')

    const options: Options = {
      ...this.options,
      data
    }

    return this.requestProcessing<string>(url, options, 'post')
  }



  private getPathAuth(endPath: string) {
    return `${this.url}/${this.leaderboardPath}/${endPath}`
  }
}

export default Leaderboard
