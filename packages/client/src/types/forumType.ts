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
  chat_id: number;
  time: string;
  type?: string;
  content: string;
  file?: FileMessage;
  user: User | null;
};

export type Chat = {
  id: number;
  title: string;
  createAd: string;
  last_message?: Message;
  user: User;
  unread_count: number;
};

