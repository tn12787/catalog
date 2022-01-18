import { IsOptional, IsUrl } from 'class-validator';

import { UpdateBaseReleaseTaskDto } from '../tasks/update';

export class UpdateArtworkDto extends UpdateBaseReleaseTaskDto {
  @IsOptional()
  @IsUrl()
  url?: string;
}
