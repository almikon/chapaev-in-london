import { ApiResponse } from '../types/api';
import { LeaderBoardPaths } from '../types/apiPaths';
import {
	AddLeaderboardDto,
	GetAllLeaderboardDto,
	GetTeamLeaderboardDto,
	LeaderboardResponse,
} from '../types/dto/leaderboard.dto';
import { Options } from '../types/httpTransport';
import { Api } from './Api';

export class Leaderboard extends Api {
	private readonly leaderboardPath: string = LeaderBoardPaths.LEADERBOARD;

	constructor(url: string) {
		super(url);
	}

	public addUser = async (
		data: AddLeaderboardDto
	): Promise<ApiResponse<string>> => {
		const url = this.getPathAuth('');

		const options: Options = {
			...this.options,
			data,
		};

		return this.requestProcessing<string>(url, options, 'post');
	};

	public getAllLeaderboard = async (
		data: GetAllLeaderboardDto
	): Promise<ApiResponse<LeaderboardResponse>> => {
		const url = this.getPathAuth(LeaderBoardPaths.ALL);

		const options: Options = {
			...this.options,
			data,
		};

		return this.requestProcessing<LeaderboardResponse>(url, options, 'post');
	};

	public getTeamLeaderboard = async (
		data: GetTeamLeaderboardDto,
		GetTeamLeaderboardDto: string
	): Promise<ApiResponse<LeaderboardResponse>> => {
		const url = this.getPathAuth(GetTeamLeaderboardDto);

		const options: Options = {
			...this.options,
			data,
		};

		return this.requestProcessing<LeaderboardResponse>(url, options, 'post');
	};

	private getPathAuth = (endPath: string) => {
		return `${this.url}/${this.leaderboardPath}/${endPath}`;
	};
}
