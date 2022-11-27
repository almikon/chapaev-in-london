import { apiPath } from '../assets/config';
import { Auth } from './Auth';
import { Chats } from './Chats';
import { Leaderboard } from './Leaderboard';
import { Users } from './Users';

class ApiService {
	public getAuthApi = () => {
		return new Auth(apiPath);
	};

	public getUsersApi = () => {
		return new Users(apiPath);
	};

	public getChatsApi = () => {
		return new Chats(apiPath);
	};

	public getLeaderboardApi = () => {
		return new Leaderboard(apiPath);
	};
}

export const apiService = new ApiService();
