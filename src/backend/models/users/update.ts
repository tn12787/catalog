import { UserOnboardingSegment } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEnum(UserOnboardingSegment)
  segment: UserOnboardingSegment;
}
