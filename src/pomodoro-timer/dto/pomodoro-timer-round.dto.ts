import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PomodoroTimerRoundDto {
  @IsNumber()
  totalSeconds: number;

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
