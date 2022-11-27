import { Avatar, Id } from './commom.dto';

export type Login = {
  login: string;
};

export type Password = {
  password: string;
};

export type DisplayName = {
  display_name: string;
};

export type SigninDto = Login & Password;

export type UserDto = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangePasswordsDto = {
  oldPassword: string;
  newPassword: string;
};

export type CreateUserDto = UserDto & Password;
export type UpdateUserDto = UserDto & DisplayName;

export type User = Id & UserDto & Avatar & DisplayName;
