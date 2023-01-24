import type { UserEntity } from '../modules/users/user.entity';

export enum NameDB {
  CHAT = 'chat',
  COMMENTS = 'comments',
  USER = 'user',
}

export enum ChatColumns {
  Title = 'title',
  LastMessage = 'last_message',
  LastMessageId = 'last_message_id',
  UserId = 'user_id',
  User = 'user',
}

export enum UserColumns {
  ID = 'id',
  FirstName = 'first_name',
  SecondName = 'second_name',
  DisplayName = 'display_name',
  Login = 'login',
  Email = 'email',
  Phone = 'phone',
  Avatar = 'avatar',
  Chat = 'chat',
  Theme = 'theme',
}

export type ChatDto = {
  [ChatColumns.Title]: string;
  [ChatColumns.LastMessageId]: number | null;
  [ChatColumns.User]: UserEntity;
  [ChatColumns.UserId]: number;
};

export type UserDto = {
  [UserColumns.FirstName]: string;
  [UserColumns.FirstName]: string;
  [UserColumns.SecondName]: string;
  [UserColumns.DisplayName]: string;
  [UserColumns.Login]: string;
  [UserColumns.Email]: string;
  [UserColumns.Phone]: string;
  [UserColumns.Avatar]: string;
  [UserColumns.Theme]: string;
};

export type UserUpdateDto = UserDto & {
  id: number;
};