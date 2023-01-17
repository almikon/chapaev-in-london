import { ApiResponse } from '../types/api';
import { ChatsPaths } from '../types/apiPaths';
import { CreateCommentDto } from '../types/dto/comments.dto';
import { Message } from '../types/forumType';
import { Options } from '../types/httpTransport';
import { Api } from './Api';

export class Comments extends Api {
	private readonly commentsPath: string = ChatsPaths.FORUM_COMMENTS;

	constructor(url: string) {
		super(url);
	}

	public getComments = async (): Promise<ApiResponse<Message[]>> => {

		const url = this.getPathAuth('');

		const options: Options = {
			...this.options,
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
}