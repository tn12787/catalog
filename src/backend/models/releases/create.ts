import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsDate, IsEnum } from 'class-validator';

export class CreateReleaseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(ReleaseType)
  type: ReleaseType;

  @IsNotEmpty()
  artist: string;

  @IsNotEmpty()
  @IsDate()
  targetDate: Date;

  @IsNotEmpty()
  team: string;
}
