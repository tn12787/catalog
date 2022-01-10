import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  id: string;

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
