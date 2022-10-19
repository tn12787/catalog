import { IsString, IsNotEmpty } from 'class-validator';

export class LinkReleaseTrackDto {
  @IsNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
