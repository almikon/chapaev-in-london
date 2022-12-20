import { action, makeObservable, observable } from 'mobx';
import { apiService } from '../api/ApiService';
import { mockForum } from '../assets/mockData/mockForum';
import { User } from '../types/dto/user.dto';
import { Chat, Message } from '../types/forumType';

export class ForumStore {
	chats: Chat[] = [];
	messages: Message[] = [];
	activeChat: number | null = null;
	isLoading = false;

	private api = apiService.getChatsApi();

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
				createChat: action
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

	getMessages = (chatId: number) => {
		this.isLoading = true;

		mockForum.getMessagesByChatId(chatId)
			.then(res => {
				this.messages = [...res];
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
			})
			.catch(() => {
				this.isLoading = false;
			});
	};
}

export const forumStore = observable(new ForumStore());
