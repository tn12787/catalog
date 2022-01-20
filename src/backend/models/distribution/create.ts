import { IsNotEmpty } from 'class-validator';

import { CreateBaseReleaseTaskDto } from '../tasks/create';

export class CreateDistributionDto extends CreateBaseReleaseTaskDto {
  @IsNotEmpty()
  distributor: string;
}
