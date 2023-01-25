import { AutoIncrement, Column, DataType, HasMany, Index, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { NameDB, UserColumns } from '../../types/database';
import { ChatEntity } from '../chat/chat.entity';
import { CommentsEntity } from '../comments/comments.entity';

@Table({
	tableName: NameDB.USER
	})
export class UserEntity extends Model<UserEntity> {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	override id: number;

	@Column(DataType.TEXT)
	[UserColumns.FirstName]: string;

	@Column(DataType.TEXT)
	[UserColumns.SecondName]: string;

	@Column(DataType.TEXT)
	[UserColumns.DisplayName]: string;

	@Index
	@Column(DataType.TEXT)
	[UserColumns.Login]: string;

	@Column(DataType.TEXT)
	[UserColumns.Email]: string;

	@Column(DataType.TEXT)
	[UserColumns.Phone]: string;

	@Column(DataType.TEXT)
	[UserColumns.Avatar]: string;

	@HasMany(() => ChatEntity)
	[UserColumns.Chat]: ChatEntity[];

	@HasMany(() => CommentsEntity)
	[UserColumns.Comments]: CommentsEntity[];
}
