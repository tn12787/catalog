import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsDate, IsEnum, IsUrl, IsOptional } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  spotifyUrl?: string;

  @IsOptional()
  instagramUrl?: ReleaseType;

  @IsNotEmpty()
  legalName: string;

  @IsNotEmpty()
  team: string;
}
