import { IsOptional, IsUrl } from 'class-validator';

import { CreateBaseReleaseTaskDto } from '../tasks/create';

export class CreateArtworkDto extends CreateBaseReleaseTaskDto {
  @IsOptional()
  @IsUrl()
  url?: string;
}
