import { IsNotEmpty, IsDate, IsEnum, IsString, IsOptional, IsArray } from 'class-validator';

import { TaskStatus } from '.prisma/client';

export class UpdateDistributionDto {
  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  distributor?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  assignees?: string[];
}
