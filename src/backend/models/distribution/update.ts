import { IsOptional, IsString } from 'class-validator';

import { UpdateBaseReleaseTaskDto } from '../tasks/update';

export class UpdateDistributionDto extends UpdateBaseReleaseTaskDto {
  @IsOptional()
  @IsString()
  distributor?: string;
}
