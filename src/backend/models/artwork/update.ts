import {
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsString,
  IsOptional,
  IsUrl,
} from 'class-validator';

import { TaskStatus } from '.prisma/client';

export class UpdateArtworkDto {
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
  assignee?: string;

  @IsOptional()
  @IsDate()
  completedOn?: Date;

  @IsOptional()
  @IsUrl()
  url?: string;
}
