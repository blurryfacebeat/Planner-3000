import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PomodoroTimerRoundDto {
  @IsOptional()
  @IsNumber()
  totalSeconds: number;

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
