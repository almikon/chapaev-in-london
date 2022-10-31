import { Avatar, Id, Role } from './commom.dto'
import { User } from './user.dto'

export type CreateChatDto = {
  title: string
}

export type UserId = {
  userId: number
}

export type Result = {
  result: Id & CreateChatDto & Avatar
}

export type DeleteChatDto = {
  chatId: number
}

export type Limit = {
  limit: string
}

export type Offset = {
  offset: string
}

export type Name = {
  name: string
}

export type Email = {
  email: string
}

export type CreatedBy = {
  created_by: number
}

export type UnreadCount = {
  unread_count: number
}

export type LastMessage = {
  last_message: {
    user: User
    time: string
    content: string
  }
}

export type GetChatDto = CreateChatDto & Limit & Offset
export type GetChatUsersDto = Offset & Limit & Name & Email
export type ResponseDeleteChat = UserId & Result & Email

export type ResponseChatUsers = User & Role
export type ResponseTokenChat = {
  token: string
}
export type Chat = Id &
  CreateChatDto &
  Avatar &
  CreatedBy &
  UnreadCount &
  LastMessage
