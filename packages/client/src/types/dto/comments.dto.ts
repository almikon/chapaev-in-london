import { Message } from '../forumType';
import { User } from './user.dto';

export type CreateCommentDto = {
    content: string;
    user: User | null;
    parrent_comment?: Message | null;
    chat_id: number;
  };

export type GetCommentDto = {
    chatId: number;
};
