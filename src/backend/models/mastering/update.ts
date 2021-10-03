import { IsNotEmpty, IsDate, IsEnum, IsString, IsOptional, IsUrl } from 'class-validator';

import { TaskStatus } from '.prisma/client';

export class UpdateMasteringDto {
  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  assignees?: string[];

  @IsOptional()
  @IsUrl()
  url?: string;
}
