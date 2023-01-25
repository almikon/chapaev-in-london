import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { CommentsColumns, NameDB } from '../../types/database';
import { UserEntity } from '../users/user.entity';

@Table({
	tableName: NameDB.COMMENTS
	})
export class CommentsEntity extends Model<CommentsEntity> {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	override id: number;

	@Column(DataType.STRING)
	[CommentsColumns.Message]: string;

	@Column(DataType.STRING)
	[CommentsColumns.ParentUser]: string | null;

	@Column(DataType.STRING)
	[CommentsColumns.ParentDate]: string | null;

	@Column(DataType.INTEGER)
	[CommentsColumns.Chat_id]: number;

	@ForeignKey(() => UserEntity)
	@Column
	[CommentsColumns.UserId]: number;

	@BelongsTo(() => UserEntity)
	[CommentsColumns.User]: UserEntity;

	@ForeignKey(() => CommentsEntity)
	@Column
	[CommentsColumns.Parent_comment_id]: number;

}
