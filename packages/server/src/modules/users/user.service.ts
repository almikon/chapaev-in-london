import type { WhereOptions } from 'sequelize';
import type { Sequelize } from 'sequelize-typescript';
import type { UserDto, UserUpdateDto } from '../../types/database';
import { UserColumns } from '../../types/database';
import type { UserEntity } from './user.entity';

export class UserService {
	static instance: UserService;

	private readonly repository: any;

	constructor(sequelize: Sequelize) {
		this.repository = sequelize.models.UserEntity;
	}

	public create = async (createUserDto: UserDto): Promise<UserEntity> => {
		return await this.repository.create(createUserDto);
	};

	public findAll = async () => {
		return this.repository.findAll();
	};

	public findOneByFilter = async (where: WhereOptions<UserEntity>) => {
		return this.repository.findOne({
			where
		});
	};

	public update = async (id: number, userUpdateDto: UserUpdateDto) => {
		return await this.repository.update({ ...userUpdateDto, id }, {
			where: {
				[UserColumns.ID]: id
			}
		});
	};
}
