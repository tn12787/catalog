import { IsString, IsNotEmpty } from 'class-validator';

export class CopyReleaseTrackDto {
  @IsNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
