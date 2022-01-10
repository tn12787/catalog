import { IsDate, IsEnum, IsString, IsOptional, IsUrl, IsArray } from 'class-validator';
import { TaskStatus } from '@prisma/client';

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
  @IsArray()
  assignees?: string[];

  @IsOptional()
  @IsUrl()
  url?: string;
}
