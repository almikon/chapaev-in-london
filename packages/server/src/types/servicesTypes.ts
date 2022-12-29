import type { ChatService } from '../modules/chat/chat.service';
import type { UserService } from '../modules/users/user.service';

export type ChatServiceType = {
  chatService: ChatService;
  userService: UserService;
};
