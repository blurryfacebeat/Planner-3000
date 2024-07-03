import { PomodoroSettingsDto } from './pomodoro-settings.dto';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { MIN_PASSWORD_ERROR } from '../../auth/messages/auth.messages';

export class UserDto extends PomodoroSettingsDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @MinLength(6, {
    message: MIN_PASSWORD_ERROR,
  })
  @IsString()
  @IsOptional()
  password?: string;
}
