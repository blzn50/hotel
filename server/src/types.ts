import { User } from './entities/User';

export type LoginInfo = {
  email: string;
  password: string;
};

export type RegisterInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ForgotPasswordDTO = {
  email: string;
};

export type ReservationInfo = {
  arrival: Date;
  departure: Date;
  guestNumber: number;
};

export interface SearchObject {
  arrival: Date;
  departure: Date;
  roomType: string;
  guestNumber: number;
  noOfRoom: number;
}

export type FieldError = {
  field: string;
  message: string;
};

export type UserResponse = {
  errors?: FieldError[];
  user: User;
};

export type JWTObject = {
  email: string;
  id: number;
};

export class CustomError extends Error {
  name: string;
  code: string;
  elaborateMessage: string[];

  constructor(name: string, elaborateMessage: string[]) {
    super();
    this.name = name;
    this.elaborateMessage = elaborateMessage;
  }
}
