import { User } from './user.dto';

export type CreateCommentDto = {
    message: string;
    user: Omit<User, 'id'>;
    parrent_comment_id?: number | null;
    chat_id: number;
  };

export type GetCommentDto = {
    chatId: number;
};
