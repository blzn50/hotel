import { MinLength } from 'class-validator';

export class ResetPasswordDTO {
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  password: string;
}
