import type { ModelCtor, Sequelize } from 'sequelize-typescript';
import type { ChatDto } from '../../types/database';
import { ChatColumns } from '../../types/database';
import { UserEntity } from '../users/user.entity';
import { ChatEntity } from './chat.entity';

export class ChatService {
	private readonly repository: ModelCtor;

	constructor(sequelize: Sequelize) {
		this.repository = sequelize.getRepository(ChatEntity);
	}

	public create = async (createChatDto: ChatDto) => {
		return await this.repository.create(createChatDto);
	};

	public findAll = async () => {
		return await this.repository.findAll({
			attributes: {
				exclude: [ChatColumns.UserId]
			},
			include: {
				model: UserEntity
			}
		});
	};
}
