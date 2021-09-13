import { ReleaseType } from '@prisma/client';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsUrl()
  spotifyUrl?: string;

  @IsUrl()
  instagramUrl?: ReleaseType;

  @IsNotEmpty()
  legalName: string;

  @IsNotEmpty()
  team: string;
}
