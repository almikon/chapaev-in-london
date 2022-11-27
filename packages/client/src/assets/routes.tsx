import { Landing } from '../pages/landing/Landing';
import { SignIn } from '../pages/signin/SignIn';
import { SignUp } from '../pages/signup/SignUp';
import { RoutePaths, RoutesType } from '../types/routes';

export const routes: RoutesType[] = [
	{
		isAuth: false,
		path: RoutePaths.SIGN_UP,
		element: <SignUp />,
	},
	{
		isAuth: false,
		path: RoutePaths.SIGN_IN,
		element: <SignIn />,
	},
	{
		isAuth: true,
		path: RoutePaths.MAIN,
		element: <Landing />,
	},
	{
		isAuth: true,
		path: RoutePaths.SETTINGS,
		element: <h1>Settings</h1>,
	},
	{
		isAuth: true,
		path: RoutePaths.PROFILE,
		element: <h1>Profile</h1>,
	},
	{
		isAuth: true,
		path: RoutePaths.FORUM,
		element: <h1>FORUM</h1>,
	},
	{
		isAuth: true,
		path: RoutePaths.LEADERBOARD,
		element: <h1>LEADERBOARD</h1>,
	},
	{
		isAuth: false,
		path: RoutePaths.UNKNOWN,
		element: <h1>Нет такой</h1>,
	},
];
