import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsDate, IsEnum, IsOptional } from 'class-validator';

import { ReleaseType as ReleaseTypeEnum } from 'types/common';

export class UpdateReleaseDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEnum(ReleaseTypeEnum)
  type: ReleaseType;

  @IsOptional()
  artist: string;

  @IsOptional()
  @IsDate()
  targetDate: Date;
}
