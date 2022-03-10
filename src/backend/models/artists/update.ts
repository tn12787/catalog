import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  spotifyId?: string;

  @IsOptional()
  instagramUsername?: string;

  @IsOptional()
  tiktokUsername?: string;

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  linkTreeUrl?: string;

  @IsNotEmpty()
  legalName: string;
}
