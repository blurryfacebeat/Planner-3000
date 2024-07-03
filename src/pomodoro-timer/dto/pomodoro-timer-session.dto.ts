import { IsBoolean, IsOptional } from 'class-validator';

export class PomodoroTimerSessionDto {
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
