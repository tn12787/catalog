import { IsString, IsNotEmpty } from 'class-validator';

import { BaseReleaseTrackDto } from './common';

export class UpdateReleaseTrackDto extends BaseReleaseTrackDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
