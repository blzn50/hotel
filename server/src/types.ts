import { User } from './entities/User';

export type LoginInfo = {
  usernameOrEmail: string;
  password: string;
};

export type RegisterInfo = {
  username: string;
  email: string;
  password: string;
};

export type FieldError = {
  field: string;
  message: string;
};

export type UserResponse = {
  errors?: FieldError[];
  user: User;
};

export interface Error {
  code?: string;
  name?: string;
}
