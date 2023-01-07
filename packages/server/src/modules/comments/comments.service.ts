import type { ModelCtor, Sequelize } from 'sequelize-typescript';
import type { CommentsDto } from '../../types/database';
import { CommentsColumns } from '../../types/database';
import { CommentsEntity } from './comments.entity';

export class CommentsService {
	private readonly repository: ModelCtor;

	constructor(sequelize: Sequelize) {
		this.repository = sequelize.getRepository(CommentsEntity);
	}

	public create = async (createCommentsDto: CommentsDto) => {
		return await this.repository.create(createCommentsDto);
	};

	public findAll = async () => {
		return await this.repository.findAll({
			attributes: {
				exclude: [CommentsColumns.UserId]
			},
			include: {
				model: CommentsEntity
			}
		});
	};
}