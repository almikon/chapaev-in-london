import {
	AutoIncrement,
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { ChatColumns, NameDB } from '../../types/database';
import { UserEntity } from '../users/user.entity';

@Table({
	tableName: NameDB.CHAT,
	})
export class ChatEntity extends Model<ChatEntity> {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	override id: number;

	@Column(DataType.TEXT)
	[ChatColumns.Title]: string;

	@Column(DataType.INTEGER)
	[ChatColumns.LastMessageId]: number | null;

	@Column(DataType.INTEGER)
	[ChatColumns.LastMessage]: undefined;

	@ForeignKey(() => UserEntity)
	@Column
	[ChatColumns.UserId]: number;

	@BelongsTo(() => UserEntity)
	[ChatColumns.User]: UserEntity;
}
