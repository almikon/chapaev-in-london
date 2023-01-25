import { AxiosError, AxiosResponse } from 'axios';
import { HTTPTransport } from '../services/HTTPTransport';
import { ApiResponse } from '../types/api';
import { Headers, Options, OptionsWithoutMethod } from '../types/httpTransport';

export class Api extends HTTPTransport {
	protected readonly url: string;

	private headers: Headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',

	};

	protected options: OptionsWithoutMethod = {
		headers: this.headers,
		withCredentials: true,
		crossDomain: true,
	};

	constructor(url: string) {
		super();
		this.url = url;
	}

	requestProcessing = async <Data>(
		url: string,
		options: Options,
		method: keyof HTTPTransport
	): Promise<ApiResponse<Data>> => {
		const apiResponse: ApiResponse<Data> = {} as ApiResponse<Data>;

		try {
			const response: AxiosResponse = await this[method](url, options);

			apiResponse.statusCode = response.status;
			apiResponse.data = response.data;
		} catch (e: unknown) {
			if (e instanceof AxiosError) {
				if (e.response) {
					apiResponse.statusCode = e.response.status;
					apiResponse.message = e.response.data?.reason || e.response.data;
				}
			}
		}

		return apiResponse;
	};
}
