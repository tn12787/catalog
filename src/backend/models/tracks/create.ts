import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateReleaseTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lyrics?: string;

  @IsNotEmpty()
  @IsString({ each: true })
  mainArtists?: string[];

  @IsOptional()
  @IsString({ each: true })
  featuringArtists?: string[];
}
