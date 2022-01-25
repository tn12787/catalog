import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsDate, IsEnum, IsOptional, ValidateNested } from 'class-validator';

import { CreateReleaseTaskDto } from '../tasks/combined';

import { ReleaseType as ReleaseTypeEnum } from 'types/common';

export class CreateReleaseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(ReleaseTypeEnum)
  type: ReleaseType;

  @IsNotEmpty()
  artist: string;

  @IsOptional()
  @ValidateNested()
  artwork?: CreateReleaseTaskDto;

  @IsOptional()
  @ValidateNested()
  distribution?: CreateReleaseTaskDto;

  @IsNotEmpty()
  @IsDate()
  targetDate: Date;

  @IsNotEmpty()
  team: string;
}
