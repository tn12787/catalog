import { IsDate, IsEnum, IsString, IsOptional, IsArray } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateBaseReleaseTaskDto {
  @IsOptional()
  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  assignees?: string[];
}
