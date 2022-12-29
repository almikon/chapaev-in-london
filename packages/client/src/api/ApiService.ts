import { apiPathChapaev, apiPathYandex } from '../assets/config';
import { Auth } from './Auth';
import { Chats } from './Chats';
import { Leaderboard } from './Leaderboard';
import { OAuth } from './OAuth';
import { Users } from './Users';

class ApiService {
	public getAuthApi = () => {
		return new Auth(apiPathYandex);
	};

	public getOAuthAPI = () => {
		return new OAuth(apiPath);
	};

	public getUsersApi = () => {
		return new Users(apiPathYandex);
	};

	public getChatsApi = () => {
		return new Chats(apiPathChapaev);
	};

	public getLeaderboardApi = () => {
		return new Leaderboard(apiPathYandex);
	};
}

export const apiService = new ApiService();
