import { UserOnboardingSegment } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';

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
  @IsBoolean()
  receiveEmail: boolean;
}
