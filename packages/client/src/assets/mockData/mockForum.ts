import { Chat, Message } from '../../types/forumType';

const defaultSize = 10;

const createRandomText = () => {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	let word = '';

	for (let i = 0; i < 6; i++) {
		word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
	}

	return word;
};

class MockData {
	private countMessagesId = 0;
	private countChatId = 0;
	private countUserId = 0;

	private messages: Message[] = [];
	private chats: Chat[] = [];

	constructor(defaultSize: number) {
		this.fillDefault(defaultSize);
	}

	private fillDefault = async (defaultSize: number) => {
		for (let i = 0; i < defaultSize; i++) {

			const chat: Chat = {
				id: this.countChatId,
				title: createRandomText(),
				unread_count: Math.round(Math.random() * 100),
				create_ad: (new Date()).toDateString(),
				creator: {
					id: this.countUserId,
					first_name: createRandomText(),
					login: createRandomText(),
					display_name: createRandomText(),
					second_name: createRandomText(),
					phone: createRandomText(),
					avatar: 'https://pps.whatsapp.net/v/t61.24694-24/302337209_751933375873107_6630780949650108607_n.jpg?ccb=11-4&oh=01_AdS636zdYrgtMRymk3wP4CTjjuQLJhvEIszHxE5U-LXePg&oe=638B1E9B',
					email: createRandomText() + '@kuku.ru'
				},
				last_message: {
					id: this.countMessagesId++,
					chat_id: this.countChatId,
					user: {
						id: this.countUserId,
						first_name: createRandomText(),
						login: createRandomText(),
						display_name: createRandomText(),
						second_name: createRandomText(),
						phone: createRandomText(),
						avatar: 'https://pps.whatsapp.net/v/t61.24694-24/302337209_751933375873107_6630780949650108607_n.jpg?ccb=11-4&oh=01_AdS636zdYrgtMRymk3wP4CTjjuQLJhvEIszHxE5U-LXePg&oe=638B1E9B',
						email: createRandomText() + '@kuku.ru'
					},
					time: (new Date()).toDateString(),
					content: createRandomText(),
					type: createRandomText()
				}
			};

			const message: Message = {
				id: this.countMessagesId++,
				chat_id: this.countChatId,
				user: {
					id: this.countUserId,
					first_name: createRandomText(),
					login: createRandomText(),
					display_name: createRandomText(),
					second_name: createRandomText(),
					phone: createRandomText(),
					avatar: 'https://pps.whatsapp.net/v/t61.24694-24/302337209_751933375873107_6630780949650108607_n.jpg?ccb=11-4&oh=01_AdS636zdYrgtMRymk3wP4CTjjuQLJhvEIszHxE5U-LXePg&oe=638B1E9B',
					email: createRandomText() + '@kuku.ru'
				},
				time: (new Date()).toDateString(),
				content: createRandomText(),
				type: createRandomText()
			};
			const message2: Message = {
				id: this.countMessagesId++,
				chat_id: this.countChatId++,
				user: {
					id: this.countUserId,
					first_name: createRandomText(),
					login: createRandomText(),
					display_name: createRandomText(),
					second_name: createRandomText(),
					phone: createRandomText(),
					avatar: 'https://pps.whatsapp.net/v/t61.24694-24/302337209_751933375873107_6630780949650108607_n.jpg?ccb=11-4&oh=01_AdS636zdYrgtMRymk3wP4CTjjuQLJhvEIszHxE5U-LXePg&oe=638B1E9B',
					email: createRandomText() + '@kuku.ru'
				},
				time: (new Date()).toDateString(),
				content: createRandomText(),
				type: createRandomText()
			};

			await this.addChat(chat);
			await this.addMessage(message);
			await this.addMessage(message2);
		}
	};

	public addChat = async (chat: Chat) => {
		this.chats.push(chat);
	};

	public addMessage = async (message: Message) => {
		this.messages.push(message);
	};

	public getChats = async (): Promise<Chat[]> => {
		return this.chats;
	};

	public getChatById = async (id: number): Promise<Chat | undefined> => {
		return this.chats.find(chat => chat.id === id);
	};

	public getMessages = async (): Promise<Message[]> => {
		return this.messages;
	};

	public getMessagesByChatId = async (chatId: number): Promise<Message[]> => {
		return this.messages.filter(message => message.chat_id === chatId);
	};
}

export const mockForum = new MockData(defaultSize);

