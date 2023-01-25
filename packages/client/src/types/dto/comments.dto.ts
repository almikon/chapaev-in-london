import { User } from './user.dto';

export type CreateCommentDto = {
    message: string;
    user: Omit<User, 'id'>;
    user_id:number;
    parent_comment_id?: number | null;
    chat_id: number;
    parentUser: string;
    parentDate: string;
  };

export type GetCommentDto = {
    chatId?: number;
};