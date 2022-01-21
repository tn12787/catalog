import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsDate, IsEnum } from 'class-validator';

import { ReleaseType as ReleaseTypeEnum } from 'types/common';

export class UpdateReleaseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(ReleaseTypeEnum)
  type: ReleaseType;

  @IsNotEmpty()
  artist: string;

  @IsNotEmpty()
  @IsDate()
  targetDate: Date;
}
