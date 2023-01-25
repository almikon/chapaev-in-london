import { ApiResponse } from '../types/api';
import { ChatsPaths } from '../types/apiPaths';
import {
	AddDeleteUserChatDto,
	Chat,
	CreateChatDto,
	DeleteChatDto,
	GetChatDto,
	GetChatUsersDto,
	ResponseChatUsers,
	ResponseDeleteChat,
	ResponseTokenChat
} from '../types/dto/chats.dto';
import { Options } from '../types/httpTransport';
import { Api } from './Api';

export class Chats extends Api {
	private readonly chatsPath: string = ChatsPaths.CHAT;

	constructor(url: string) {
		super(url);
	}

	public getChats = async (): Promise<ApiResponse<Chat[]>> => {
		const url = this.getPathAuth('');

		const options: Options = {
			...this.options
		};
		return await this.requestProcessing<Chat[]>(url, options, 'get');
	};

	public createChat = async (
		data: CreateChatDto
	): Promise<ApiResponse<string>> => {
		const url = this.getPathAuth('');

		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<string>(url, options, 'post');
	};

	public deleteChat = async (
		data: DeleteChatDto
	): Promise<ApiResponse<ResponseDeleteChat>> => {
		const url = this.getPathAuth('');
		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<ResponseDeleteChat>(url, options, 'delete');
	};

	public getChat = async (
		data: Partial<GetChatDto>
	): Promise<ApiResponse<Chat[]>> => {
		const query = this.getQuery<Partial<GetChatDto>>(data);

		const url =
      query.length === 0
      	? this.getPathAuth('')
      	: `${this.url}/${this.chatsPath}${query}`;

		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<Chat[]>(url, options, 'get');
	};

	public getChatUsers = async (
		id: number,
		data: Partial<GetChatUsersDto>
	): Promise<ApiResponse<ResponseChatUsers[]>> => {
		const query = this.getQuery<Partial<GetChatUsersDto>>(data);
		let url = this.getPathAuth(`${id}/${ChatsPaths.USERS}`);

		if (query.length !== 0) {
			url += query;
		}

		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<ResponseChatUsers[]>(url, options, 'get');
	};

	public getToken = async (
		chatId: string
	): Promise<ApiResponse<ResponseTokenChat>> => {
		const url = this.getPathAuth(`${ChatsPaths.TOKEN}/${chatId}`);

		const options: Options = {
			...this.options
		};

		return this.requestProcessing<ResponseTokenChat>(url, options, 'post');
	};

	public addUserChat = async (
		data: AddDeleteUserChatDto
	): Promise<ApiResponse<string>> => {
		const url = this.getPathAuth(ChatsPaths.USERS);

		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<string>(url, options, 'put');
	};

	public deleteUserChat = async (
		data: AddDeleteUserChatDto
	): Promise<ApiResponse<string>> => {
		const url = this.getPathAuth(ChatsPaths.USERS);

		const options: Options = {
			...this.options,
			data
		};

		return this.requestProcessing<string>(url, options, 'delete');
	};

	private getPathAuth = (endPath: string) => {
		return `${this.url}/${this.chatsPath}/${endPath}`;
	};

	private getQuery = <T>(data: T): string => {
		const startSymbolQuery = '?';
		let query = '';

		for (const dataKey in data) {
			if (query.length === 0) {
				query += startSymbolQuery;
			}

			if (query[length - 1] !== startSymbolQuery) {
				query += '&';
			}

			const key = dataKey as keyof typeof data;
			const value = data[key];

			query += `${dataKey}=${value}`;
		}

		return query;
	};
}
