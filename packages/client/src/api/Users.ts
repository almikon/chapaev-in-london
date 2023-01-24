import { ApiResponse } from '../types/api';
import { UsersPaths } from '../types/apiPaths';
import {
	ChangePasswordsDto,
	CreateUserOnChapaevDto,
	Login,
	UpdateUserDto,
	UpdateUserOnChapaevDto,
	User
} from '../types/dto/user.dto';
import { Options } from '../types/httpTransport';
import { Api } from './Api';

export class Users extends Api {
	private readonly usersPath: string = UsersPaths.USER;

	constructor(url: string) {
		super(url);
	}

	public changeProfile = async (
		data: UpdateUserDto
	): Promise<ApiResponse<User>> => {
		const url = this.getPathAuth(UsersPaths.PROFILE);

		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<User>(url, options, 'put');
	};

	public changeAvatar = async (file: File): Promise<ApiResponse<User>> => {
		const url = this.getPathAuth(UsersPaths.PROFILE_AVATAR);

		const data = new FormData();
		data.append('avatar', file);

		const options: Options = {
			...this.options,
			headers: {
				' Content-Type': 'multipart/form-data'
			},
			data
		};

		return this.requestProcessing<User>(url, options, 'put');
	};

	public changePasswords = async (
		data: ChangePasswordsDto
	): Promise<ApiResponse<User>> => {
		const url = this.getPathAuth(UsersPaths.PASSWORD);

		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<User>(url, options, 'put');
	};

	public getUserById = async (id: string): Promise<ApiResponse<User>> => {
		const url = this.getPathAuth(id);

		const options: Options = {
			...this.options
		};

		return this.requestProcessing<User>(url, options, 'get');
	};

	public search = async (data: Login): Promise<ApiResponse<User[]>> => {
		const url = this.getPathAuth(UsersPaths.SEARCH);

		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<User[]>(url, options, 'post');
	};

	public createUserOnChapaev = async (
		data: CreateUserOnChapaevDto
	): Promise<ApiResponse<User>> => {
		const url = this.getPathAuth('');

		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<User>(url, options, 'post');
	};

	public changeThemeOnChapaev = async (
		data: UpdateUserOnChapaevDto
	): Promise<ApiResponse<any>> => {
		const url = this.getPathAuth(UsersPaths.THEME);
		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<User>(url, options, 'put');
	};

	private getPathAuth = (endPath: string) => {
		return `${this.url}/${this.usersPath}/${endPath}`;
	};
}
