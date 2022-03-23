import { UserOnboardingSegment } from '@prisma/client';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

import { UpdateEmailPreferencesDto } from './email/update';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(UserOnboardingSegment)
  segment: UserOnboardingSegment;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @ValidateNested()
  emailPreferences: UpdateEmailPreferencesDto;
}
