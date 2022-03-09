import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  spotifyId?: string;

  @IsOptional()
  instagramUsername?: string;

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  linkTreeUrl?: string;

  @IsNotEmpty()
  legalName: string;

  @IsNotEmpty()
  workspace: string;
}
