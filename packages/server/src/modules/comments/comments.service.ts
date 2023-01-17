import type { WhereOptions } from 'sequelize';
import type { Sequelize } from 'sequelize-typescript';
import type { CommentsDto } from '../../types/database';
import { UserEntity } from '../users/user.entity';
import { CommentsEntity } from './comments.entity';

export class CommentsService {
	private readonly repository: any;

	constructor(sequelize: Sequelize) {
		this.repository = sequelize.getRepository(CommentsEntity);
	}

	public create = async (createCommentsDto: CommentsDto) => {
		return await this.repository.create(createCommentsDto);
	};

	public findAll = async () => {
		return await this.repository.findAll({
			include: {
				model: UserEntity
			}
		});
	};

	public findOneByFilter = async (where: WhereOptions<CommentsEntity>) => {
		return await this.repository.findOne({
			where
		});
	};
}