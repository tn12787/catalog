import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsDate, IsEnum, IsOptional, ValidateNested } from 'class-validator';

import { CreateReleaseTaskWithoutTypeDto } from '../tasks/combined';

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
  artwork?: CreateReleaseTaskWithoutTypeDto;

  @IsOptional()
  @ValidateNested()
  distribution?: CreateReleaseTaskWithoutTypeDto;

  @IsOptional()
  @ValidateNested()
  mastering?: CreateReleaseTaskWithoutTypeDto;

  @IsNotEmpty()
  @IsDate()
  targetDate: Date;

  @IsNotEmpty()
  workspace: string;
}
