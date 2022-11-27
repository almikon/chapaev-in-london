import { ApiResponse } from '../types/api';
import { AuthPaths } from '../types/apiPaths';
import { Id } from '../types/dto/commom.dto';
import { CreateUserDto, SigninDto, User } from '../types/dto/user.dto';
import { Options } from '../types/httpTransport';
import { Api } from './Api';

export class Auth extends Api {
	private readonly authPath: string = AuthPaths.AUTH;

	constructor(url: string) {
		super(url);
	}

	public signin = async (data: SigninDto): Promise<ApiResponse<string>> => {
		const url = this.getPathAuth(AuthPaths.SIGN_IN);

		const options: Options = {
			...this.options,
			data,
		};

		return this.requestProcessing<string>(url, options, 'post');
	};

	public signup = async (data: CreateUserDto): Promise<ApiResponse<Id>> => {
		const url = this.getPathAuth(AuthPaths.SIGN_UP);

		const options: Options = {
			...this.options,
			data,
		};

		return this.requestProcessing<Id>(url, options, 'post');
	};

	public logout = async (): Promise<ApiResponse<string>> => {
		const url = this.getPathAuth(AuthPaths.LOGOUT);

		const options: Options = {
			...this.options,
		};

		return this.requestProcessing<string>(url, options, 'post');
	};

	public getUser = async (): Promise<ApiResponse<User>> => {
		const url = this.getPathAuth(AuthPaths.USER);

		const options: Options = {
			...this.options,
		};

		return this.requestProcessing<User>(url, options, 'get');
	};

	private getPathAuth = (endPath: string) => {
		return `${this.url}/${this.authPath}/${endPath}`;
	};
}
