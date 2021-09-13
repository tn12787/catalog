import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsDate, IsEnum, IsUrl, IsOptional } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUrl()
  spotifyUrl?: string;

  @IsOptional()
  @IsUrl()
  instagramUrl?: ReleaseType;

  @IsNotEmpty()
  legalName: string;

  @IsNotEmpty()
  team: string;
}
