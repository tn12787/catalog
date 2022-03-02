import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  spotifyUrl?: string;

  @IsOptional()
  instagramUrl?: string;

  @IsNotEmpty()
  legalName: string;

  @IsNotEmpty()
  workspace: string;
}
