import { IsOptional, IsUrl } from 'class-validator';

import { CreateBaseReleaseTaskDto } from '../tasks/create';

export class CreateMasteringDto extends CreateBaseReleaseTaskDto {
  @IsOptional()
  @IsUrl()
  url?: string;
}
