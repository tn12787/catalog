import { IsDate, IsEnum, IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { ReleaseTaskType, TaskStatus } from '@prisma/client';

export class CreateBaseReleaseTaskDto {
  @IsOptional()
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsEnum(ReleaseTaskType)
  type: ReleaseTaskType;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  assignees?: string[];

  @IsOptional()
  @IsArray()
  contacts?: string[];
}
