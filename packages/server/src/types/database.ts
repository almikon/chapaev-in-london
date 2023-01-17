import type { UserEntity } from '../modules/users/user.entity';

export enum NameDB {
  CHAT = 'chat',
  COMMENTS = 'comments',
  USER = 'user'
}

export enum ChatColumns {
  Title = 'title',
  LastMessage = 'last_message',
  LastMessageId = 'last_message_id',
  UserId = 'user_id',
  User = 'user',
}

export enum UserColumns {
  FirstName = 'first_name',
  SecondName = 'second_name',
  DisplayName = 'display_name',
  Login = 'login',
  Email = 'email',
  Phone = 'phone',
  Avatar = 'avatar',
  Chat = 'chat',
  Comments = 'comments',
}

export enum CommentsColumns {
  Id = 'id',
  Message = 'message',
  Parent_comment_id = 'parent_comment_id',
  UserId = 'user_id',
  User = 'user',
  Chat_id = 'chat_id',
  ParentUser = 'parent_user',
  ParentDate = 'parent_date'
}

export type ChatDto = {
  [ChatColumns.Title]: string;
  [ChatColumns.LastMessageId]: number | null;
  [ChatColumns.User]: UserEntity;
  [ChatColumns.UserId]: number;
};

export type UserDto = {
  [UserColumns.FirstName]: string;
  [UserColumns.SecondName]: string;
  [UserColumns.DisplayName]: string;
  [UserColumns.Login]: string;
  [UserColumns.Email]: string;
  [UserColumns.Phone]: string;
  [UserColumns.Avatar]: string;
};

export type CommentsDto = {
  [CommentsColumns.Message]: string;
  [CommentsColumns.User]:UserEntity;
  [CommentsColumns.Parent_comment_id]: number | null;
  [CommentsColumns.Chat_id]: number;
  [CommentsColumns.UserId]:number;
  [CommentsColumns.ParentUser]: string;
  [CommentsColumns.ParentDate]: string;
};
