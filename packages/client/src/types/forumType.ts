export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type FileMessage = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type Message = {
  id?:number;
  chat_id: number;
  createdAt: string;
  type?: string;
  message: string;
  file?: FileMessage;
  user: User | null;
  user_id: number;
  parent_date: string;
  parent_user: string;
  parent_comment_id: number | null;
};

export type Chat = {
  id: number;
  title: string;
  createAd: string;
  last_message?: Message;
  user: User;
  unread_count: number;
};
