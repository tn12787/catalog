import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsDate, IsEnum, IsOptional, ValidateNested } from 'class-validator';

import { ReleaseType as ReleaseTypeEnum } from 'types';
import { CreateDistributionDto } from 'backend/models/distribution/create';
import { CreateArtworkDto } from 'backend/models/artwork/create';

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
  artwork?: CreateArtworkDto;

  @IsOptional()
  @ValidateNested()
  distribution?: CreateDistributionDto;

  @IsNotEmpty()
  @IsDate()
  targetDate: Date;

  @IsNotEmpty()
  team: string;
}
