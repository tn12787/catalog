import { TaskStatus } from '.prisma/client';
import { IsNotEmpty, IsDate, IsEnum, IsString, IsOptional } from 'class-validator';

export class CreateDistributionDto {
  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNotEmpty()
  distributor: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  assignee?: string;
}