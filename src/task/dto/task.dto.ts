import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';

export class TaskDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @IsEnum(Priority)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  priority?: Priority;
}
