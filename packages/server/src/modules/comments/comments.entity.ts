import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { CommentsColumns, NameDB } from '../../types/database';

@Table({
	tableName: NameDB.COMMENTS
	})
export class CommentsEntity extends Model<CommentsEntity>{
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	override id:number;

	@Column(DataType.STRING)
	[CommentsColumns.Message]:string | null;

	@Column(DataType.INTEGER)
	[CommentsColumns.Parent_comment_id]:number | null;

	@Column(DataType.INTEGER)
	[CommentsColumns.Chat_id]: number | null;
}
