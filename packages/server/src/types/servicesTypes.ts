import type { ChatService } from '../modules/chat/chat.service';
import type { CommentsService } from '../modules/comments/comments.service';
import type { UserService } from '../modules/users/user.service';

export type ChatServiceType = {
  chatService: ChatService;
  userService: UserService;
};

export type CommentsServiceType = {
  commentsService: CommentsService;
  userService: UserService;
};

export type UserServiceType = {
  userService: UserService;
};
