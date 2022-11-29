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
  id: number ;
  user_id: number ;
  path: string ;
  filename: string ;
  content_type: string ;
  content_size: number ;
  upload_date: string ;
};

export type Message =  {
  id: number;
  chat_id: number ;
  time: string ;
  type: string ;
  user: User ;
  content: string ;
  file?: FileMessage;
};

export type Chat = {
  id: number;
  title: string;
  create_ad: string;
  last_message: Message;
  creator: User;
  unread_count: number;
};

