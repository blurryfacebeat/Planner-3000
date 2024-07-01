import { IsEmail, IsString, MinLength } from 'class-validator';
import { MIN_PASSWORD_ERROR } from '../messages/auth.messages';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: MIN_PASSWORD_ERROR,
  })
  @IsString()
  password: string;
}
