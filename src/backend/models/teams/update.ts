import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsDate, IsEnum } from 'class-validator';

export class UpdateTeamDto {
  @IsNotEmpty()
  name: string;
}
