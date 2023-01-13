import { action, makeObservable, observable } from 'mobx';
import { apiService } from '../api/ApiService';
// import { GetCommentDto } from '../types/dto/comments.dto';
import { User } from '../types/dto/user.dto';
import { Chat, Message } from '../types/forumType';
import { omitProps } from '../utils/omitProps';

export class ForumStore {
	chats: Chat[] = [];
	messages: Message[] = [];
	activeChat: number | null = null;
	isLoading = false;

	private api = apiService.getChatsApi();
	private api_comments = apiService.getCommentsApi();

	constructor() {
		makeObservable(
			this, {
				chats: observable,
				messages: observable,
				activeChat: observable,
				isLoading: observable,
				changeActiveChat: action,
				getChats: action,
				getMessages: action,
				createChat: action,
				createComment: action
			},
			{ deep: true }
		);
	}

	getChats = () => {
		this.isLoading = true;

		this.api.getChats()
			.then((res) => {
				if (res.data && res.data.length > 0) {
					this.chats = [...res.data as unknown as Chat[]];
				} else {
					this.chats = [];
				}

				this.isLoading = false;
			})
			.catch(() => {
				this.isLoading = false;
			});
	};

	getMessages = () => {
		this.isLoading = true;
		this.api_comments.getComments()
			.then((res) => {
				if (res.data && res.data.length > 0) {
					this.messages = [...res.data as unknown as Message[]];
				} else {
					this.messages = [];
				}

				this.isLoading = false;
			})
			.catch(() => {
				this.isLoading = false;
			});
	};

	changeActiveChat = (id: null | number) => {
		this.activeChat = id;
	};

	createChat = (title: string, user: Omit<User, 'id'>) => {
		this.isLoading = true;

		this.api.createChat({
			title,
			user
		})
			.then(() => {
				this.isLoading = false;
				this.getChats();
			})
			.catch(() => {
				this.isLoading = false;
			});
	};

	createComment = (
		message: string,
		userWithId: User,
		chat_id: number
	) => {
		this.isLoading = true;
		const user = omitProps(userWithId,['id']);
		this.api_comments.createComment({
			message,
			user,
			parrent_comment_id : null,
			chat_id
		})
			.then(() => {
				this.isLoading = false;
				// this.getMessages(chat_id);
			})
			.catch(() => {
				this.isLoading = false;
			});
	};
}

export const forumStore = observable(new ForumStore());
