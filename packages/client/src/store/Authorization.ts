import { action, makeObservable, observable } from 'mobx';
import { NavigateFunction } from 'react-router-dom';
import { apiService } from '../api/ApiService';
import { oAuthYandex, redirectUri } from '../assets/config';
import { CreateUserDto, SigninDto, User } from '../types/dto/user.dto';
import { RoutePaths } from '../types/routes';
import { omitProps } from '../utils/omitProps';

export class AuthorizationStore {
	user: User | null = null;
	theme: string | undefined = 'light';
	errorText = '';

	private api = apiService.getAuthApi();
	private oauth = apiService.getOAuthAPI();
	private userOnChapaev = apiService.getUserOnChapaevAPI();

	constructor() {
		makeObservable(
			this,
			{
				user:observable,
				errorText:observable,
				theme:observable,
				isLogin:action,
				signUp:action,
				signIn:action,
				logout:action,
				toggleTheme:action,
			},
			{ deep:true }
		);
	}

	toggleTheme = () => {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		if (this.user) {
			this.userOnChapaev.changeThemeOnChapaev({ login:this.user!.login, theme:this.theme });
		}
	};

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

					const userWithoutId: any = omitProps(this.user, ['id']);

					this.userOnChapaev.createUserOnChapaev({ ...userWithoutId, theme:this.theme })
						.then(({ data }) => {
							this.theme = data!.theme;
						});
				}

				if (message) {
					this.errorResponse(message, navigate);
				}
			})
			.catch((e: Error) => this.errorResponse(e.message, navigate));
	};

	getOAuthServiceId = () => {
		return this.oauth
			.getCode()
			.then(res =>
				window.location.replace(
					`${ oAuthYandex }/authorize?response_type=code&client_id=${ res?.data?.service_id }&redirect_uri=${ redirectUri }`
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
					navigate(RoutePaths.PROFILE, { replace:true });
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
					navigate(RoutePaths.PROFILE, { replace:true });
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
			navigate(RoutePaths.SIGN_IN, { replace:true });
		}
	};
}

export const authorizationStore = new AuthorizationStore();
