import {
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsString,
  IsOptional,
  IsUrl,
} from 'class-validator';

import { TaskStatus } from '.prisma/client';

export class CreateArtworkDto {
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
  @IsString()
  assignee?: string;

  @IsOptional()
  @IsUrl()
  url?: string;
}
