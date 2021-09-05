import { TaskStatus } from '.prisma/client';
import { IsNotEmpty, IsDate, IsEnum, IsString } from 'class-validator';

export class CreateDistributionDto {
  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNotEmpty()
  distributor: string;

  @IsString()
  notes?: string;

  @IsString()
  assignee?: string;

  @IsNotEmpty()
  release: string;

  @IsDate()
  completedOn?: Date;
}
