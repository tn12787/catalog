import { IsOptional, IsUrl } from 'class-validator';

import { UpdateBaseReleaseTaskDto } from '../tasks/update';

export class UpdateMusicVideoDto extends UpdateBaseReleaseTaskDto {
  @IsOptional()
  @IsUrl()
  url?: string;
}
