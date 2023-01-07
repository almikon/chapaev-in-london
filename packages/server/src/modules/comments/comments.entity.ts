import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { CommentsColumns, NameDB } from '../../types/database';
import { ChatEntity } from '../chat/chat.entity';
import { UserEntity } from '../users/user.entity';

@Table({
	tableName: NameDB.COMMENTS
	})
export class CommentsEntity extends Model<CommentsEntity>{
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	override id:number;

	@Column(DataType.STRING)
	[CommentsColumns.Message]:string;

	@Column(DataType.INTEGER)
	[CommentsColumns.Parent_comment_id]?:number | null;

	@ForeignKey(() => UserEntity)
	@Column
	[CommentsColumns.UserId]:number;

	@ForeignKey(() => ChatEntity)
	[CommentsColumns.Chat_id]: ChatEntity;
}
