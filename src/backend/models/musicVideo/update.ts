import { IsOptional, IsUrl } from 'class-validator';

import { BaseReleaseTaskDto } from '../tasks/update';

export class UpdateMusicVideoDto extends BaseReleaseTaskDto {
  @IsOptional()
  @IsUrl()
  url?: string;
}
