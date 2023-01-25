import { stores } from '../store';
import { ApiResponse } from '../types/api';
import { LeaderBoardPaths } from '../types/apiPaths';
import {
	AddLeaderboardDto,
	GetAllLeaderboardDto,
	GetTeamLeaderboardDto,
	LeaderboardResponse
} from '../types/dto/leaderboard.dto';
import { Options } from '../types/httpTransport';
import { Api } from './Api';

const TEAM_NAME = 'ChapaevInLondon';
const RATING_FIELD_NAME = 'score';

export class Leaderboard extends Api {
	private readonly leaderboardPath: string = LeaderBoardPaths.LEADERBOARD;

	constructor(url: string) {
		super(url);
	}

	/**
   * Записать {{ score }} очков в лидерборд текущему пользователю
   * Если score больше текущего значения - обновляем запись
   * @param score
   */
	public setCurrentUserScore = async (
		score: number
	): Promise<ApiResponse<string>> => {
		const userData = stores.authorizationStore.user;
		const userId = userData?.id as number;
		return this.setUserScore(userId, score);
	};

	/**
   * Установить значение score в лидерборд для пользователя userId
   * Примечание: во время тестирования заметил, что 1 аккаунт может влиять только на 1 запись.
   * Может изменить старую, но новую добавить нельзя
   * @param userId
   * @param score
   */
	private setUserScore = async (userId: number, score: number): Promise<ApiResponse<string>> => {
		const url = this.getPathAuth('');
		const data: AddLeaderboardDto = {
			data: {
				userId,
				score
			},
			teamName: TEAM_NAME,
			ratingFieldName: RATING_FIELD_NAME
		};
		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<string>(url, options, 'post');
	};

	public getAllLeaderboard = async (
		data: GetAllLeaderboardDto
	): Promise<ApiResponse<LeaderboardResponse>> => {
		const url = this.getPathAuth(LeaderBoardPaths.ALL);

		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<LeaderboardResponse>(url, options, 'post');
	};

	public getTeamLeaderboard = async (): Promise<ApiResponse<LeaderboardResponse>> => {
		const url = this.getPathAuth(TEAM_NAME);
		const data: GetTeamLeaderboardDto = {
			ratingFieldName: RATING_FIELD_NAME,
			limit: 30,
			cursor: 0
		};
		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<LeaderboardResponse>(url, options, 'post');
	};

	private getPathAuth = (endPath: string) => {
		return `${this.url}/${this.leaderboardPath}/${endPath}`;
	};
}
