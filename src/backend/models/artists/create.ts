import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsDate, IsEnum, IsUrl } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  spotifyUrl?: string;

  @IsUrl()
  instagramUrl?: ReleaseType;

  @IsNotEmpty()
  legalName: string;

  @IsNotEmpty()
  @IsDate()
  targetDate: Date;

  @IsNotEmpty()
  team: string;
}
