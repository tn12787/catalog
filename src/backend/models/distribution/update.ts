import { IsOptional, IsString } from 'class-validator';

import { BaseReleaseTaskDto } from '../tasks/update';

export class UpdateDistributionDto extends BaseReleaseTaskDto {
  @IsOptional()
  @IsString()
  distributor?: string;
}
