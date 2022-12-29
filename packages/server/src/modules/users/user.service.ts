import type { WhereOptions } from 'sequelize';
import type { Sequelize } from 'sequelize-typescript';
import type { UserDto } from '../../types/database';
import type { UserEntity } from './user.entity';

export class UserService {
	private readonly repository: any;

	constructor(sequelize: Sequelize) {
		this.repository = sequelize.models.UserEntity;
	}

	public create = async (createUserDto: UserDto): Promise<UserEntity> => {
		return await this.repository.create(createUserDto);
	};

	public findOneByFilter = async (where: WhereOptions<UserEntity>) => {
		return await this.repository.findOne({
			where
		});
	};
}
