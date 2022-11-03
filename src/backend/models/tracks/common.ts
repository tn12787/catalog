import { IsNotEmpty, IsString, IsOptional, ArrayNotEmpty } from 'class-validator';

export class BaseReleaseTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lyrics?: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  mainArtists: string[];

  @IsOptional()
  @IsString({ each: true })
  featuringArtists: string[];
}
