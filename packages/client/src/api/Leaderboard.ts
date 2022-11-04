import Api from './Api'
import { ApiResponse } from '../types/api'
import { Options } from '../types/httpTranspport'
import { LeaderBoardPaths } from '../types/api-paths'
import {
  AddLeaderboardDto,
  GetAllLeaderboardDto,
  GetTeamLeaderboardDto, LeaderboardResponse
} from '../types/dto/leaderboard.dto'

class Leaderboard extends Api {
  private readonly leaderboardPath: string = LeaderBoardPaths.LEADERBOARD

  constructor(url: string) {
    super(url)
  }

  public async addUser(data: AddLeaderboardDto): Promise<ApiResponse<string>> {
    const url = this.getPathAuth('')

    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestProcessing<string>(url, options, 'post')
  }


  public async getAllLeaderboard(data: GetAllLeaderboardDto): Promise<ApiResponse<LeaderboardResponse>> {
    const url = this.getPathAuth(LeaderBoardPaths.ALL)

    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestProcessing<LeaderboardResponse>(url, options, 'post')
  }

  public async getTeamLeaderboard(data: GetTeamLeaderboardDto, GetTeamLeaderboardDto: string): Promise<ApiResponse<LeaderboardResponse>> {
    const url = this.getPathAuth(GetTeamLeaderboardDto)

    const options: Options = {
      ...this.options,
      data,
    }

    return this.requestProcessing<LeaderboardResponse>(url, options, 'post')
  }

  private getPathAuth(endPath: string) {
    return `${this.url}/${this.leaderboardPath}/${endPath}`
  }
}

export default Leaderboard
