import { Chat } from '../pages/forum/chat/Chat';
import { CreateChat } from '../pages/forum/createChat/CreateChat';
import { Forum } from '../pages/forum/Forum';
import { Game } from '../pages/game/Game';
import { Landing } from '../pages/landing/Landing';
import { Leaderboard } from '../pages/leaderboard/Leaderboard';
import { Profile } from '../pages/profile/Profile';
import { SignIn } from '../pages/signin/SignIn';
import { SignUp } from '../pages/signup/SignUp';
import { stores } from '../store';
import { RoutePaths, RoutesType } from '../types/routes';

export const routes: RoutesType[] = [
	{
		isAuth: false,
		path: RoutePaths.SIGN_UP,
		element: <SignUp />
	},
	{
		isAuth: false,
		path: RoutePaths.SIGN_IN,
		element: <SignIn />
	},
	{
		isAuth: true,
		path: RoutePaths.MAIN,
		element: <Landing />
	},
	{
		isAuth: true,
		path: RoutePaths.SETTINGS,
		element: <h1>Settings</h1>
	},
	{
		isAuth: true,
		path: RoutePaths.PROFILE,
		element: <Profile store={stores.authorization}/>
	},
	{
		isAuth: true,
		path: RoutePaths.FORUM,
		element: <Forum />,
		children: [
			{
				isAuth: true,
				path: RoutePaths.FORUM_CREATE_CHAT,
				element: <CreateChat />
			},
			{
				isAuth: true,
				path: RoutePaths.FORUM_CHAT,
				element: <Chat />
			},
		]
	},
	{
		isAuth: true,
		path: RoutePaths.LEADERBOARD,
		element: <Leaderboard/>
	},
	{
		isAuth: true,
		path: RoutePaths.GAME,
		element: <Game/>
	},
	{
		isAuth: false,
		path: RoutePaths.UNKNOWN,
		element: <h1>Нет такой</h1>
	}
];

