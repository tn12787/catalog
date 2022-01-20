import { IsOptional, IsUrl } from 'class-validator';

import { CreateBaseReleaseTaskDto } from '../tasks/create';

export class CreateMusicVideoDto extends CreateBaseReleaseTaskDto {
  @IsOptional()
  @IsUrl()
  url?: string;
}
