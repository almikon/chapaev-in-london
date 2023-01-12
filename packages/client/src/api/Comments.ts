import { ApiResponse } from '../types/api';
import { ChatsPaths } from '../types/apiPaths';
import { CreateCommentDto, GetCommentDto } from '../types/dto/comments.dto';
import { Message } from '../types/forumType';
import { Options } from '../types/httpTransport';
import { Api } from './Api';

export class Comments extends Api {
	private readonly commentsPath: string = ChatsPaths.FORUM_COMMENTS;

	constructor(url: string) {
		super(url);
	}

	public getComments = async (data : Partial<GetCommentDto>): Promise<ApiResponse<Message[]>> => {
		const query = this.getQuery<Partial<GetCommentDto>>(data);
		const url =
      query.length === 0
      	? this.getPathAuth('')
      	: `${this.url}/${this.commentsPath}${query}`;
		const options: Options = {
			...this.options,
			data
		};

		return await this.requestProcessing<Message[]>(url, options, 'get');
	};

	public createComment = async (
		data: CreateCommentDto
	): Promise<ApiResponse<string>> => {
		const url = this.getPathAuth('');
		const options: Options = {
			...this.options,
			data
		};
		return this.requestProcessing<string>(url, options, 'post');
	};

	private getPathAuth = (endPath: string) => {
		return `${this.url}/${this.commentsPath}/${endPath}`;
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