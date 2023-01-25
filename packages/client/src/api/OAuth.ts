import { redirectUri } from '../assets/config';
import { ApiResponse } from '../types/api';
import { OAuthPaths } from '../types/apiPaths';
import { Options } from '../types/httpTransport';
import { Api } from './Api';

export class OAuth extends Api {
	private readonly oAuthPath: string = OAuthPaths.OAUTH;

	constructor(url: string) {
		super(url);
	}

	public getCode = async () => {
		const url = this.getPathAuth(`${OAuthPaths.YANDEX}/service-id?redirect_uri=${redirectUri}`);

		const options: Options = {
			...this.options,
			withCredentials: true
		};

		return this.requestProcessing<Record<string, string>>(url, options, 'get');
	};

	public sendCode = async (data: string): Promise<ApiResponse<string>> => {
		const url = this.getPathAuth(OAuthPaths.YANDEX);

		const options: Options = {
			...this.options,
			withCredentials: true,
			data
		};

		return this.requestProcessing<string>(url, options, 'post');
	};

	private getPathAuth = (endPath: string) => {
		return `${this.url}/${this.oAuthPath}/${endPath}`;
	};
}
