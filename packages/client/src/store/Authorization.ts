import { action, makeObservable, observable } from 'mobx';
import { NavigateFunction } from 'react-router-dom';
import { apiService } from '../api/ApiService';
import { oAuthYandex, redirectUri } from '../assets/config';
import { CreateUserDto, SigninDto, User } from '../types/dto/user.dto';
import { RoutePaths } from '../types/routes';

export class AuthorizationStore {
	user: User | null = null;
	errorText = '';

	private api = apiService.getAuthApi();
	private oauth = apiService.getOAuthAPI();

	constructor() {
		makeObservable(
			this,
			{
				user: observable,
				errorText: observable,
				isLogin: action,
				signUp: action,
				signIn: action,
				logout: action
			},
			{ deep: true }
		);
	}

	isLogin = (navigate: NavigateFunction) => {
		this.errorText = '';

		if (this.user) {
			return;
		}

		this.api
			.getUser()
			.then(({ data, message }) => {
				if (data) {
					this.user = data;
				}

				if (message) {
					this.errorResponse(message, navigate);
				}
			})
			.catch((e: Error) => this.errorResponse(e.message, navigate));
	};

	getOAuthServiceId = () => {
		this.oauth
			.getCode()
			.then(res =>
				window.location.replace(
					`${oAuthYandex}/authorize?response_type=code&client_id=${res?.data?.service_id}&redirect_uri=${redirectUri}`
				)
			)
			.catch((e: Error) => this.errorResponse(e.message));
	};

	oAuth = (data: string) => {
		this.oauth
			.sendCode(data)
			.catch((e: Error) => this.errorResponse(e.message));
	};

	signIn = (signInDto: SigninDto, navigate: NavigateFunction) => {
		this.errorText = '';

		this.api
			.signin(signInDto)
			.then(({ data, message }) => {
				if (data) {
					navigate(RoutePaths.PROFILE, { replace: true });
				}

				if (message) {
					this.errorResponse(message, navigate);
				}
			})
			.catch((e: Error) => this.errorResponse(e.message, navigate));
	};

	signUp = (signUpDto: CreateUserDto, navigate: NavigateFunction) => {
		this.errorText = '';

		this.api
			.signup(signUpDto)
			.then(({ data, message }) => {
				if (data?.id) {
					navigate(RoutePaths.PROFILE, { replace: true });
				}

				if (message) {
					this.errorResponse(message, navigate);
				}
			})
			.catch((e: Error) => this.errorResponse(e.message, navigate));
	};

	logout = (navigate: NavigateFunction) => {
		this.errorText = '';

		this.api.logout().finally(() => this.errorResponse('', navigate));
	};

	private errorResponse = (errorText: string, navigate?: NavigateFunction) => {
		this.user = null;
		this.errorText = errorText;

		if (navigate) {
			navigate(RoutePaths.SIGN_IN, { replace: true });
		}
	};
}

export const authorizationStore = new AuthorizationStore();
