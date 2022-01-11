import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  spotifyUrl?: string;

  @IsOptional()
  instagramUrl?: string;

  @IsNotEmpty()
  legalName: string;

  @IsNotEmpty()
  team: string;
}
